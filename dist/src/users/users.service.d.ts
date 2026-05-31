import { PrismaService } from '../prisma/prisma.service.js';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        name: string;
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
        id: string;
        name: string;
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
    deactivate(id: string): Promise<{
        id: string;
        name: string;
        email: string;
        isActive: boolean;
    }>;
    getTotalSpent(userId: string): Promise<number>;
    updatePassword(id: string, currentPassword: string, newPassword: string): Promise<{
        message: string;
    }>;
    updateProfile(id: string, data: {
        name: string;
        email: string;
        company?: string;
    }): Promise<{
        id: string;
        name: string;
        email: string;
        role: import("@prisma/client").$Enums.Role;
        company: string | null;
    }>;
}
