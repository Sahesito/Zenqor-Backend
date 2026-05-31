import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        return this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                company: true,
                isActive: true,
                createdAt: true,
                _count: { select: { orders: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findOne(id: string) {
        return this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                company: true,
                isActive: true,
                createdAt: true,
            },
        });
    }

    async getStats() {
        const [total, active] = await Promise.all([
            this.prisma.user.count(),
            this.prisma.user.count({ where: { isActive: true } }),
        ]);
        return { total, active };
    }

    async deactivate(id: string) {
        return this.prisma.user.update({
            where: { id },
            data: { isActive: false },
            select: {
                id: true,
                name: true,
                email: true,
                isActive: true,
            },
        });
    }

    async getTotalSpent(userId: string) {
        const result = await this.prisma.order.aggregate({
            where: { userId, status: 'COMPLETED' },
            _sum: { total: true },
        });
        return Number(result._sum.total || 0);
    }

    async updatePassword(id: string, currentPassword: string, newPassword: string) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) throw new NotFoundException('User not found');

        const valid = await bcrypt.compare(currentPassword, user.password);
        if (!valid) throw new UnauthorizedException('Current password is incorrect');

        const hashed = await bcrypt.hash(newPassword, 10);
        await this.prisma.user.update({
            where: { id },
            data: { password: hashed },
        });

        return { message: 'Password updated successfully' };
    }

    async updateProfile(id: string, data: { name: string; email: string; company?: string }) {
        return this.prisma.user.update({
            where: { id },
            data: {
                name: data.name,
                email: data.email,
                company: data.company,
            },
            select: {
                id: true,
                name: true,
                email: true,
                company: true,
                role: true,
            },
        });
    }
}