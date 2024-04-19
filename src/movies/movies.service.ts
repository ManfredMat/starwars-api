import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { STARWARS_API } from 'src/config';
import { Movie } from 'src/database/schemas/movie.schema';
import { MovieDto, UpdateDto, UpdateMovieDto } from 'src/dtos/movie.dto';

@Injectable()
export class MoviesService {
    constructor(@InjectModel(Movie.name) private movieModel : Model<Movie>){}

    async createMovie(moviedata:MovieDto):Promise<Movie>{
        const createdMovie = new this.movieModel(moviedata);
        return createdMovie.save()
    }

    async deleteMovie(title:string):Promise<object>{
        try{
            await this.movieModel.deleteOne({title:title});
        }catch(e){
            throw new Error(e)
        }
        return {status:'OK' , message:'Movie deleted succesfully'}
    }
    async updateMovie(data:UpdateDto):Promise<object>{
        try{
            await this.movieModel.findOneAndUpdate({title:data.title} , data.update , {new:true} )
        }catch(e){
            throw new Error(e)
        }
        return {status:'OK' , message:'Movie updated succesfully'}
    }

    async getAllMovies():Promise<any[]>{
        const outsideMovies : any[] = (await axios.get(STARWARS_API)).data?.results;
        let aux =[];
        for(let i = 0 ; outsideMovies?.length > i; i++){
            aux.push({
                title:outsideMovies[0]?.title || 'Missing information',
                episode_id:outsideMovies[0]?.episode_id || 'Missing information' ,
                director:outsideMovies[0]?.director || 'Missing information',
                producer:outsideMovies[0]?.producer || 'Missing information',
                realese_date:outsideMovies[0]?.realese_date|| 'Missing information'
            })
        }
        const ownMovies = await this.movieModel.find();

        return ownMovies.concat(aux)

    }
}
