import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto.js';
import { JwtGuard } from '../auth/guards/jwt.guard.js';

@UseGuards(JwtGuard)
@Controller('products')
export class ProductsController {
    constructor(private products: ProductsService) { }

    @Get()
    findAll(@Query('search') search?: string) {
        return this.products.findAll(search);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.products.findOne(id);
    }

    @Post()
    create(@Body() dto: CreateProductDto) {
        return this.products.create(dto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
        return this.products.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.products.remove(id);
    }
}