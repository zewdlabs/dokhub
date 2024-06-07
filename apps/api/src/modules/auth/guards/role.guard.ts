// import { PrismaService } from '@/modules/prisma/prisma.service';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  matchRoles(roles: string[], userRole: string) {
    return roles.some((role) => role === userRole);
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return this.matchRoles(roles, user.role);
  }
  // constructor(
  //   private reflector: Reflector,
  //   private prismaService: PrismaService,
  // ) {}

  // matchRoles(roles: string[], userRole: string) {
  //   return roles.some((role) => role === userRole);
  // }

  // async canActivate(context: ExecutionContext): Promise<boolean> {
  //   const roles = this.reflector.get<string[]>('roles', context.getHandler());
  //   if (!roles) {
  //     return true;
  //   }
  //   const request = context.switchToHttp().getRequest();
  //   const user = request.user;
  //   const organizationId = request.params.orgId;

  //   const userRole = await this.prismaService.membership.findUnique({
  //     where: {
  //       userId_organizationId: {
  //         userId: user.id,
  //         organizationId,
  //       },
  //     },
  //     select: {
  //       role: true,
  //     },
  //   });

  //   if (!userRole) {
  //     return false;
  //   }

  //   return this.matchRoles(roles, userRole.role);
  // }
}
