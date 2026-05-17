import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service.js';
import { RegisterDto, LoginDto } from './dto/auth.dto.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
    ) { }

    async register(dto: RegisterDto) {
        const exists = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });

        if (exists) throw new ConflictException('Email already in use');

        const hashed = await bcrypt.hash(dto.password, 10);

        const user = await this.prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                password: hashed,
                company: dto.company,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                company: true,
                createdAt: true,
            },
        });

        const token = this.signToken(user.id, user.email, user.role);
        return { user, token };
    }

    async login(dto: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });

        if (!user) throw new UnauthorizedException('Invalid credentials');

        const valid = await bcrypt.compare(dto.password, user.password);
        if (!valid) throw new UnauthorizedException('Invalid credentials');

        if (!user.isActive) throw new UnauthorizedException('Account is inactive');

        const { password: _, ...safeUser } = user;
        const token = this.signToken(user.id, user.email, user.role);
        return { user: safeUser, token };
    }

    private signToken(userId: string, email: string, role: string) {
        return this.jwt.sign({ sub: userId, email, role });
    }
}