import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractToken(request);

        if (!token) throw new UnauthorizedException('No token provided');

        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET || 'zenqor-secret');
            request.user = payload;
            return true;
        } catch (e) {
            console.error('JWT Error:', e);
            throw new UnauthorizedException('Invalid token');
        }
    }

    private extractToken(request: any): string | null {
        const auth = request.headers?.authorization;
        if (!auth) return null;
        const [type, token] = auth.split(' ');
        return type === 'Bearer' ? token : null;
    }
}