import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto.js';

@Injectable()
export class CategoriesService {
    constructor(private prisma: PrismaService) { }

    findAll() {
        return this.prisma.category.findMany({
            orderBy: { name: 'asc' },
            include: { _count: { select: { products: true } } },
        });
    }

    async create(dto: CreateCategoryDto) {
        const exists = await this.prisma.category.findUnique({
            where: { name: dto.name },
        });
        if (exists) throw new ConflictException('Category already exists');
        return this.prisma.category.create({ data: dto });
    }

    async update(id: string, dto: UpdateCategoryDto) {
        const cat = await this.prisma.category.findUnique({ where: { id } });
        if (!cat) throw new NotFoundException('Category not found');
        return this.prisma.category.update({ where: { id }, data: dto });
    }

    async remove(id: string) {
        const cat = await this.prisma.category.findUnique({
            where: { id },
            include: { _count: { select: { products: true } } },
        });
        if (!cat) throw new NotFoundException('Category not found');
        if (cat._count.products > 0) {
            throw new ConflictException('Cannot delete category with products');
        }
        return this.prisma.category.delete({ where: { id } });
    }
}