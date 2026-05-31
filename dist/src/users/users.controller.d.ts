import { UsersService } from './users.service.js';
export declare class UsersController {
    private users;
    constructor(users: UsersService);
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
    updatePassword(req: any, body: {
        currentPassword: string;
        newPassword: string;
    }): Promise<{
        message: string;
    }>;
    updateProfile(req: any, body: {
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
