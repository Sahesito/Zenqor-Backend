import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
    private client: PrismaClient;

    constructor() {
        const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
        this.client = new PrismaClient({ adapter });
    }

    get user() { return this.client.user; }
    get product() { return this.client.product; }
    get category() { return this.client.category; }
    get order() { return this.client.order; }
    get orderItem() { return this.client.orderItem; }
    get payment() { return this.client.payment; }

    async onModuleInit() {
        await this.client.$connect();
    }

    async onModuleDestroy() {
        await this.client.$disconnect();
    }
}