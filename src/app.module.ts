import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_STRING_CONNECTION } from './config';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot(MONGO_STRING_CONNECTION), UsersModule, MoviesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
