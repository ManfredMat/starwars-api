import { CanActivate, ExecutionContext, Injectable , UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JWT_SECRET } from 'src/config';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService : JwtService){}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext):Promise<boolean>{
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if(!token){
      throw new UnauthorizedException();
    }
    try{
      const verification = await this.jwtService.verifyAsync(token , {secret:JWT_SECRET.secret})
      request['user'] = verification;
    }catch{
      throw new UnauthorizedException();
    }
    return true
  }


}
