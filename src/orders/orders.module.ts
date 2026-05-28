import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { OrdersController } from './orders.controller.js';
import { AnalyticsController } from './analytics.controller.js';

@Module({
    controllers: [OrdersController, AnalyticsController],
    providers: [OrdersService],
    exports: [OrdersService],
})
export class OrdersModule { }