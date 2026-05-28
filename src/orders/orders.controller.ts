import { Controller, Get, Post, Put, Body, Param, UseGuards, Request } from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/order.dto.js';
import { JwtGuard } from '../auth/guards/jwt.guard.js';

@UseGuards(JwtGuard)
@Controller('orders')
export class OrdersController {
    constructor(private orders: OrdersService) { }

    @Get()
    findAll(@Request() req: any) {
        return this.orders.findAll(req.user.sub, req.user.role);
    }

    @Get('stats')
    getStats() {
        return this.orders.getStats();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.orders.findOne(id);
    }

    @Post()
    create(@Request() req: any, @Body() dto: CreateOrderDto) {
        return this.orders.create(req.user.sub, dto);
    }

    @Put(':id/status')
    updateStatus(@Param('id') id: string, @Body() dto: UpdateOrderStatusDto) {
        return this.orders.updateStatus(id, dto);
    }
}