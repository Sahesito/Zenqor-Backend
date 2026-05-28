"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../prisma/prisma.service.js");
let OrdersService = class OrdersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(userId, role) {
        const where = role === 'ADMIN' ? {} : { userId };
        return this.prisma.order.findMany({
            where,
            include: {
                user: { select: { id: true, name: true, email: true } },
                items: {
                    include: {
                        product: { select: { id: true, name: true, price: true } },
                    },
                },
                payment: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: {
                user: { select: { id: true, name: true, email: true } },
                items: {
                    include: {
                        product: { select: { id: true, name: true, price: true } },
                    },
                },
                payment: true,
            },
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        return order;
    }
    async create(userId, dto) {
        const productIds = dto.items.map((i) => i.productId);
        const products = await this.prisma.product.findMany({
            where: { id: { in: productIds } },
        });
        if (products.length !== productIds.length) {
            throw new common_1.BadRequestException('One or more products not found');
        }
        let total = 0;
        const orderItems = dto.items.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            const price = Number(product.price);
            total += price * item.quantity;
            return {
                productId: item.productId,
                quantity: item.quantity,
                price: product.price,
            };
        });
        const order = await this.prisma.order.create({
            data: {
                userId,
                total,
                notes: dto.notes,
                items: { create: orderItems },
            },
            include: {
                items: {
                    include: {
                        product: { select: { id: true, name: true, price: true } },
                    },
                },
                payment: true,
            },
        });
        return order;
    }
    async updateStatus(id, dto) {
        await this.findOne(id);
        return this.prisma.order.update({
            where: { id },
            data: { status: dto.status },
        });
    }
    async getStats() {
        const [total, completed, pending, revenue] = await Promise.all([
            this.prisma.order.count(),
            this.prisma.order.count({ where: { status: 'COMPLETED' } }),
            this.prisma.order.count({ where: { status: 'PENDING' } }),
            this.prisma.order.aggregate({
                where: { status: 'COMPLETED' },
                _sum: { total: true },
            }),
        ]);
        return {
            total,
            completed,
            pending,
            revenue: Number(revenue._sum.total || 0),
        };
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map