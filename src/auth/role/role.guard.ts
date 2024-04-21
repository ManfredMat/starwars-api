import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './role.decorator';
import { Role } from 'src/dtos/role.dto';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector:Reflector){}

  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();
    const checkRole  = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY , [context.getHandler() , context.getClass()])
    const result = user._doc.role.includes(checkRole[0])
    return result;
  }
}
