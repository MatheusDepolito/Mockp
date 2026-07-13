import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/common/types';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ErrorCodes } from 'src/common/errors/error-codes';
import { appException } from 'src/common/errors/error-response';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    await this.authenticateUser(req);

    return this.authorizeUser(req, context);
  }

  private async authenticateUser(req: any): Promise<void> {
    const bearerHeader = req.headers.authorization;
    const token = bearerHeader?.split(' ')[1];

    if (!token) {
      throw appException(
        HttpStatus.UNAUTHORIZED,
        ErrorCodes.AuthNoToken,
        'No token provided.',
      );
    }

    try {
      const user = await this.jwtService.verify(token);
      req.user = user;
    } catch (err) {
      console.error('Token validation error:', err);
    }

    if (!req.user) {
      throw appException(
        HttpStatus.UNAUTHORIZED,
        ErrorCodes.AuthInvalidToken,
        'Invalid token.',
      );
    }
  }

  private async authorizeUser(
    req: any,
    context: ExecutionContext,
  ): Promise<boolean> {
    const userRoles = await this.getUserRoles(req.user.uid);
    req.user.roles = userRoles;

    const requiredRoles = this.getMetadata<Role[]>('roles', context);
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    return requiredRoles.some((role) => userRoles.includes(role));
  }

  private getMetadata<T>(key: string, context: ExecutionContext): T {
    return this.reflector.getAllAndOverride<T>(key, [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  private async getUserRoles(uid: string): Promise<Role[]> {
    const roles: Role[] = [];

    const [admin, brokerageManager, agent] = await Promise.all([
      this.prisma.admin.findUnique({ where: { uid } }),
      this.prisma.brokerageManager.findUnique({ where: { uid } }),
      this.prisma.agent.findUnique({ where: { uid } }),
    ]);

    admin && roles.push('admin');
    brokerageManager && roles.push('brokerageManager');
    agent && roles.push('agent');

    return roles;
  }
}
