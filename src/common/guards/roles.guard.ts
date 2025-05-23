import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();

    // ✅ Normalize roles
    const normalizedRole =
      user?.role === 'individual' || user?.role === 'company'
        ? requiredRoles.includes('provider')
          ? 'provider'
          : 'user'
        : user?.role;

    return requiredRoles.includes(normalizedRole);
  }
}
