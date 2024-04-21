import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { DeleteMovieDto, MovieDto, UpdateDto } from 'src/dtos/movie.dto';
import { Role } from 'src/dtos/role.dto';
import { Roles } from 'src/auth/role/role.decorator';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RoleGuard } from 'src/auth/role/role.guard';

@Controller('movies')
export class MoviesController {
    constructor(private moviesService:MoviesService){}

    @UseGuards(AuthGuard)
    @Get('all')
    async getAllMovies(){
        return await this.moviesService.getAllMovies();
    }
    @UseGuards(AuthGuard , RoleGuard)
    @Roles(Role.ADMIN)
    @Post('new')
    async createMovie(@Body()data:MovieDto){
        return await this.moviesService.createMovie(data);
    }

    @UseGuards(AuthGuard , RoleGuard)
    @Roles(Role.ADMIN)
    @Post('update')
    async updateMovie(@Body()data:UpdateDto){
         return await this.moviesService.updateMovie(data);
    }

    @UseGuards(AuthGuard , RoleGuard)
    @Roles(Role.ADMIN)
    @Delete('delete')
    async deleteMovie(@Body()data:DeleteMovieDto){
        return await this.moviesService.deleteMovie(data.title);
    }
    
    
}
