import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from 'src/dtos/user.dto';
import { RegisterUserDto } from 'src/dtos/request_body.dto';

@Controller('users')
export class UsersController {
    constructor(private userService:UsersService){}

    @HttpCode(HttpStatus.ACCEPTED)
    @Post('register')
    async registerUser(@Body()userData:RegisterUserDto):Promise<object>{
        return this.userService.createUser(userData)
    }
}
