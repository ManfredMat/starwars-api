import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JWT_SECRET, JWT_TIME } from '../config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UsersModule , JwtModule.register({
    global:true,
    secret:JWT_SECRET.secret,
    signOptions:{expiresIn: JWT_TIME || '1h'}
  })],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
