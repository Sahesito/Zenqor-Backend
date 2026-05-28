import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt.guard.js';
import { PrismaService } from '../prisma/prisma.service.js';

@UseGuards(JwtGuard)
@Controller('analytics')
export class AnalyticsController {
    constructor(private prisma: PrismaService) { }

    @Get('overview')
    async getOverview() {
        const [
            totalRevenue,
            totalOrders,
            totalUsers,
            totalProducts,
            completedOrders,
            pendingOrders,
        ] = await Promise.all([
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

    @Get('by-status')
    async getByStatus() {
        const statuses = ['PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED'];
        const data = await Promise.all(
            statuses.map(async (status) => ({
                name: status.charAt(0) + status.slice(1).toLowerCase(),
                value: await this.prisma.order.count({
                    where: { status: status as any },
                }),
            })),
        );
        return data;
    }

    @Get('recent-orders')
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

    @Get('monthly')
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

        const data = await Promise.all(
            months.map(async ({ year, month, label }) => {
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
            }),
        );

        return data;
    }
}