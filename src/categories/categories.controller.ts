import { Controller, Get, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service.js';
import { JwtGuard } from '../auth/guards/jwt.guard.js';

@UseGuards(JwtGuard)
@Controller('categories')
export class CategoriesController {
    constructor(private categories: CategoriesService) { }

    @Get()
    findAll() {
        return this.categories.findAll();
    }
}