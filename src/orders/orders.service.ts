import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/order.dto.js';

@Injectable()
export class OrdersService {
    constructor(private prisma: PrismaService) { }

    async findAll(userId?: string, role?: string) {
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

    async findOne(id: string) {
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
        if (!order) throw new NotFoundException('Order not found');
        return order;
    }

    async create(userId: string, dto: CreateOrderDto) {
        const productIds = dto.items.map((i) => i.productId);
        const products = await this.prisma.product.findMany({
            where: { id: { in: productIds } },
        });

        if (products.length !== productIds.length) {
            throw new BadRequestException('One or more products not found');
        }

        let total = 0;
        const orderItems = dto.items.map((item) => {
            const product = products.find((p) => p.id === item.productId)!;
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

    async updateStatus(id: string, dto: UpdateOrderStatusDto) {
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
}