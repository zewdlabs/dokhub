import { UserService } from '@/modules/users/user.service';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { VerificationStatus } from '@prisma/client';

@Injectable()
export class VerificationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredStatus = this.reflector.get<string[]>(
      'verification',
      context.getHandler(),
    );
    if (requiredStatus === undefined) {
      // If no verification status is set on the handler, allow access
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      // If there is no user object in the request, deny access
      return false;
    }
    const user1 = await this.usersService.findOne(user.sub);

    return user1?.verificationStatus === VerificationStatus.VERIFIED;
  }
}
