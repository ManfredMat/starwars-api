import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { DeleteMovieDto, MovieDto, UpdateDto } from 'src/dtos/movie.dto';
import { Movie } from 'src/database/schemas/movie.schema';

@Controller('movies')
export class MoviesController {
    constructor(private moviesService:MoviesService){}

    @Get('all')
    async getAllMovies(){
        return await this.moviesService.getAllMovies();
    }

    @Post('new')
    async createMovie(@Body()data:MovieDto){
        return await this.moviesService.createMovie(data);
    }

    @Post('update')
    async updateMovie(@Body()data:UpdateDto){
         return await this.moviesService.updateMovie(data);
    }

    @Delete('delete')
    async deleteMovie(@Body()data:DeleteMovieDto){
        return await this.moviesService.deleteMovie(data.title);
    }
    
    
}
