import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { JwtGuard } from '../auth/guards/jwt.guard.js';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
    constructor(private users: UsersService) { }

    @Get()
    findAll() {
        return this.users.findAll();
    }

    @Get('stats')
    getStats() {
        return this.users.getStats();
    }
}