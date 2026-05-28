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
        status: import("@prisma/client").$Enums.OrderStatus;
        total: import("@prisma/client-runtime-utils").Decimal;
        id: string;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    })[]>;
    getMonthly(): Promise<{
        month: string;
        revenue: number;
        orders: number;
    }[]>;
}
