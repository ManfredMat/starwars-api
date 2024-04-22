import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { DeleteMovieDto, MovieDto, UpdateDto } from '../domain/dto/movie.dto';
import { Role } from '../domain/enum/role.enum';
import { Roles } from '../auth/role/role.decorator';
import { AuthGuard } from '../auth/guard/auth.guard';
import { RoleGuard } from '../auth/role/role.guard';

@Controller('movies')
export class MoviesController {
    constructor(private moviesService:MoviesService){}

    @UseGuards(AuthGuard)
    @Get('all')
    async getAllMovies(){
        return await this.moviesService.getAllMovies();
    }
    @UseGuards(AuthGuard)
    @Get(':id')
    async getById(@Param('id')id:string){
        return await this.moviesService.getById(id);
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
        return await this.moviesService.deleteMovie(data.episode_id);
    }
    
    
}
