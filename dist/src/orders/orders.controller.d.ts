import { OrdersService } from './orders.service.js';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/order.dto.js';
export declare class OrdersController {
    private orders;
    constructor(orders: OrdersService);
    findAll(req: any): Promise<({
        user: {
            name: string;
            id: string;
            email: string;
        };
        items: ({
            product: {
                name: string;
                id: string;
                price: import("@prisma/client-runtime-utils").Decimal;
            };
        } & {
            id: string;
            price: import("@prisma/client-runtime-utils").Decimal;
            quantity: number;
            orderId: string;
            productId: string;
        })[];
        payment: {
            id: string;
            createdAt: Date;
            status: import("@prisma/client").$Enums.PaymentStatus;
            orderId: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            method: string | null;
            reference: string | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        total: import("@prisma/client-runtime-utils").Decimal;
        status: import("@prisma/client").$Enums.OrderStatus;
        notes: string | null;
        userId: string;
    })[]>;
    getStats(): Promise<{
        total: number;
        completed: number;
        pending: number;
        revenue: number;
    }>;
    findOne(id: string): Promise<{
        user: {
            name: string;
            id: string;
            email: string;
        };
        items: ({
            product: {
                name: string;
                id: string;
                price: import("@prisma/client-runtime-utils").Decimal;
            };
        } & {
            id: string;
            price: import("@prisma/client-runtime-utils").Decimal;
            quantity: number;
            orderId: string;
            productId: string;
        })[];
        payment: {
            id: string;
            createdAt: Date;
            status: import("@prisma/client").$Enums.PaymentStatus;
            orderId: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            method: string | null;
            reference: string | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        total: import("@prisma/client-runtime-utils").Decimal;
        status: import("@prisma/client").$Enums.OrderStatus;
        notes: string | null;
        userId: string;
    }>;
    create(req: any, dto: CreateOrderDto): Promise<{
        items: ({
            product: {
                name: string;
                id: string;
                price: import("@prisma/client-runtime-utils").Decimal;
            };
        } & {
            id: string;
            price: import("@prisma/client-runtime-utils").Decimal;
            quantity: number;
            orderId: string;
            productId: string;
        })[];
        payment: {
            id: string;
            createdAt: Date;
            status: import("@prisma/client").$Enums.PaymentStatus;
            orderId: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            method: string | null;
            reference: string | null;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        total: import("@prisma/client-runtime-utils").Decimal;
        status: import("@prisma/client").$Enums.OrderStatus;
        notes: string | null;
        userId: string;
    }>;
    updateStatus(id: string, dto: UpdateOrderStatusDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        total: import("@prisma/client-runtime-utils").Decimal;
        status: import("@prisma/client").$Enums.OrderStatus;
        notes: string | null;
        userId: string;
    }>;
}
