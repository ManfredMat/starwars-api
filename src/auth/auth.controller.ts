import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from '../domain/dto/requestBody.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body()data:SignInDto){
        return this.authService.signIn(data.username , data.password);
    }
}
