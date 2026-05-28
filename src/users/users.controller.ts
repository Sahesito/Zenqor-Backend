import { Controller, Get, Patch, Param, UseGuards } from '@nestjs/common';
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

    @Patch(':id/deactivate')
    deactivate(@Param('id') id: string) {
        return this.users.deactivate(id);
    }
}