"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_js_1 = require("../prisma/prisma.service.js");
const bcrypt = __importStar(require("bcrypt"));
const common_2 = require("@nestjs/common");
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                company: true,
                isActive: true,
                createdAt: true,
                _count: { select: { orders: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        return this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                company: true,
                isActive: true,
                createdAt: true,
            },
        });
    }
    async getStats() {
        const [total, active] = await Promise.all([
            this.prisma.user.count(),
            this.prisma.user.count({ where: { isActive: true } }),
        ]);
        return { total, active };
    }
    async deactivate(id) {
        return this.prisma.user.update({
            where: { id },
            data: { isActive: false },
            select: {
                id: true,
                name: true,
                email: true,
                isActive: true,
            },
        });
    }
    async getTotalSpent(userId) {
        const result = await this.prisma.order.aggregate({
            where: { userId, status: 'COMPLETED' },
            _sum: { total: true },
        });
        return Number(result._sum.total || 0);
    }
    async updatePassword(id, currentPassword, newPassword) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user)
            throw new common_2.NotFoundException('User not found');
        const valid = await bcrypt.compare(currentPassword, user.password);
        if (!valid)
            throw new common_2.UnauthorizedException('Current password is incorrect');
        const hashed = await bcrypt.hash(newPassword, 10);
        await this.prisma.user.update({
            where: { id },
            data: { password: hashed },
        });
        return { message: 'Password updated successfully' };
    }
    async updateProfile(id, data) {
        return this.prisma.user.update({
            where: { id },
            data: {
                name: data.name,
                email: data.email,
                company: data.company,
            },
            select: {
                id: true,
                name: true,
                email: true,
                company: true,
                role: true,
            },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map