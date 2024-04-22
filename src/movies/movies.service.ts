import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Agent } from 'https';
import { Model } from 'mongoose';
import { STARWARS_API } from 'src/config';
import { Movie } from 'src/domain/database/schemas/movie.schema';
import { MovieDto, UpdateDto, UpdateMovieDto } from 'src/domain/dto/movie.dto';

@Injectable()
export class MoviesService {
    constructor(@InjectModel(Movie.name) private movieModel : Model<Movie>){}

    async createMovie(moviedata:MovieDto):Promise<Movie>{
        
        const externalMovies = await this.getExternalMovies();
        const checkMovie = await this.movieModel.findOne({episode_id:moviedata.episode_id});

        if(!!checkMovie || externalMovies.length >= moviedata.episode_id.valueOf()){
            throw new ConflictException({status:'ERROR' , message:'Episode number has already been used.'});
        }

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
        const outsideMovies : any[] = await this.getExternalMovies();
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

    async getExternalMovies():Promise<any[]>{
        const httpsAgent = new Agent({rejectUnauthorized:false}); // EL CERTIFICADO DE LA API SE VENCIO DURANTE LAS PRUEBAS POR ESO ESTA LINEA
        return (await axios.get(STARWARS_API , {httpsAgent:httpsAgent})).data?.results;
    }
}
