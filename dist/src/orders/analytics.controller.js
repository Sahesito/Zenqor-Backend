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
exports.AnalyticsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_js_1 = require("../auth/guards/jwt.guard.js");
const prisma_service_js_1 = require("../prisma/prisma.service.js");
let AnalyticsController = class AnalyticsController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getOverview() {
        const [totalRevenue, totalOrders, totalUsers, totalProducts, completedOrders, pendingOrders,] = await Promise.all([
            this.prisma.order.aggregate({
                where: { status: 'COMPLETED' },
                _sum: { total: true },
            }),
            this.prisma.order.count(),
            this.prisma.user.count(),
            this.prisma.product.count(),
            this.prisma.order.count({ where: { status: 'COMPLETED' } }),
            this.prisma.order.count({ where: { status: 'PENDING' } }),
        ]);
        return {
            totalRevenue: Number(totalRevenue._sum.total || 0),
            totalOrders,
            totalUsers,
            totalProducts,
            completedOrders,
            pendingOrders,
        };
    }
    async getByStatus() {
        const statuses = ['PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED'];
        const data = await Promise.all(statuses.map(async (status) => ({
            name: status.charAt(0) + status.slice(1).toLowerCase(),
            value: await this.prisma.order.count({
                where: { status: status },
            }),
        })));
        return data;
    }
    async getRecentOrders() {
        const orders = await this.prisma.order.findMany({
            take: 10,
            orderBy: { createdAt: 'desc' },
            include: {
                user: { select: { name: true } },
                items: { include: { product: { select: { name: true } } } },
            },
        });
        return orders;
    }
    async getMonthly() {
        const months = Array.from({ length: 6 }, (_, i) => {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            return {
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                label: date.toLocaleString('en', { month: 'short' }),
            };
        }).reverse();
        const data = await Promise.all(months.map(async ({ year, month, label }) => {
            const start = new Date(year, month - 1, 1);
            const end = new Date(year, month, 0, 23, 59, 59);
            const [revenue, orders] = await Promise.all([
                this.prisma.order.aggregate({
                    where: {
                        status: 'COMPLETED',
                        createdAt: { gte: start, lte: end },
                    },
                    _sum: { total: true },
                }),
                this.prisma.order.count({
                    where: { createdAt: { gte: start, lte: end } },
                }),
            ]);
            return {
                month: label,
                revenue: Number(revenue._sum.total || 0),
                orders,
            };
        }));
        return data;
    }
};
exports.AnalyticsController = AnalyticsController;
__decorate([
    (0, common_1.Get)('overview'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getOverview", null);
__decorate([
    (0, common_1.Get)('by-status'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getByStatus", null);
__decorate([
    (0, common_1.Get)('recent-orders'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getRecentOrders", null);
__decorate([
    (0, common_1.Get)('monthly'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getMonthly", null);
exports.AnalyticsController = AnalyticsController = __decorate([
    (0, common_1.UseGuards)(jwt_guard_js_1.JwtGuard),
    (0, common_1.Controller)('analytics'),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], AnalyticsController);
//# sourceMappingURL=analytics.controller.js.map