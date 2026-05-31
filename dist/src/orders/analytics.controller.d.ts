import { PrismaService } from '../prisma/prisma.service.js';
export declare class AnalyticsController {
    private prisma;
    constructor(prisma: PrismaService);
    getOverview(): Promise<{
        totalRevenue: number;
        totalOrders: number;
        totalUsers: number;
        totalProducts: number;
        completedOrders: number;
        pendingOrders: number;
    }>;
    getByStatus(): Promise<{
        name: string;
        value: number;
    }[]>;
    getRecentOrders(): Promise<({
        user: {
            name: string;
        };
        items: ({
            product: {
                name: string;
            };
        } & {
            id: string;
            price: import("@prisma/client-runtime-utils").Decimal;
            quantity: number;
            orderId: string;
            productId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        total: import("@prisma/client-runtime-utils").Decimal;
        status: import("@prisma/client").$Enums.OrderStatus;
        notes: string | null;
        userId: string;
    })[]>;
    getMonthly(): Promise<{
        month: string;
        revenue: number;
        orders: number;
    }[]>;
}
