import { PrismaService } from '../prisma/prisma.service.js';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        name: string;
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        company: string | null;
        isActive: boolean;
        createdAt: Date;
        _count: {
            orders: number;
        };
    }[]>;
    findOne(id: string): Promise<{
        name: string;
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        company: string | null;
        isActive: boolean;
        createdAt: Date;
    } | null>;
    getStats(): Promise<{
        total: number;
        active: number;
    }>;
}
