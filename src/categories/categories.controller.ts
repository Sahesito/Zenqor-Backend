import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service.js';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto.js';
import { JwtGuard } from '../auth/guards/jwt.guard.js';

@UseGuards(JwtGuard)
@Controller('categories')
export class CategoriesController {
    constructor(private categories: CategoriesService) { }

    @Get()
    findAll() {
        return this.categories.findAll();
    }

    @Post()
    create(@Body() dto: CreateCategoryDto) {
        return this.categories.create(dto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
        return this.categories.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.categories.remove(id);
    }
}