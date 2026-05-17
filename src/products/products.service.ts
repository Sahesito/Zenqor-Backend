import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto.js';

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) { }

    async findAll(search?: string) {
        return this.prisma.product.findMany({
            where: search
                ? {
                    OR: [
                        { name: { contains: search, mode: 'insensitive' } },
                        { description: { contains: search, mode: 'insensitive' } },
                    ],
                }
                : undefined,
            include: { category: { select: { id: true, name: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findOne(id: string) {
        const product = await this.prisma.product.findUnique({
            where: { id },
            include: { category: true },
        });
        if (!product) throw new NotFoundException('Product not found');
        return product;
    }

    async create(dto: CreateProductDto) {
        return this.prisma.product.create({
            data: {
                name: dto.name,
                description: dto.description,
                price: dto.price,
                stock: dto.stock,
                categoryId: dto.categoryId,
                imageUrl: dto.imageUrl,
            },
            include: { category: true },
        });
    }

    async update(id: string, dto: UpdateProductDto) {
        await this.findOne(id);
        return this.prisma.product.update({
            where: { id },
            data: dto,
            include: { category: true },
        });
    }

    async remove(id: string) {
        await this.findOne(id);
        return this.prisma.product.delete({ where: { id } });
    }
}