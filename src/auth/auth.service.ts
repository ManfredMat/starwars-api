import { Injectable , UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private userService:UsersService,
        private jwtService:JwtService
    ){}

    async signIn(username:string , pass:string):Promise<any>{
        const user = await this.userService.findOne(username);

        const compare = await bcrypt.compare(pass , user.password);
        
        if(!compare){
            throw new UnauthorizedException();
        }
        const { password , ...result } = user;
        
        return { token : await this.jwtService.signAsync(result)};
    }
}
