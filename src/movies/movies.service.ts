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
                title:outsideMovies[i]?.title || 'Missing information',
                episode_id:outsideMovies[i]?.episode_id || 'Missing information' ,
                director:outsideMovies[i]?.director || 'Missing information',
                producer:outsideMovies[i]?.producer || 'Missing information',
                release_date:outsideMovies[i]?.release_date|| 'Missing information'
            })
        }
        const ownMovies = await this.movieModel.find();

        return ownMovies.concat(aux)

    }
}
