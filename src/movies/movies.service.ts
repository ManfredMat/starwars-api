import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Agent } from 'https';
import { Model } from 'mongoose';
import { STARWARS_API } from '../config/index';
import { Movie } from '../domain/database/schemas/movie.schema';
import { MovieDto, UpdateDto, UpdateMovieDto } from '../domain/dto/movie.dto';

@Injectable()
export class MoviesService {
    constructor(@InjectModel(Movie.name) private movieModel : Model<Movie>){}

    async createMovie(moviedata:MovieDto):Promise<Movie>{
        
        const externalMovies = await this.getExternalMovies();
        const checkMovie = await this.movieModel.findOne({episode_id:moviedata.episode_id});

        if(!!checkMovie || externalMovies.length >= moviedata.episode_id.valueOf()){
            throw new ConflictException({status:'ERROR' , message:'Episode number has already been used.'});
        }

        return await this.movieModel.create(moviedata)
    }

    async deleteMovie(episode_id:Number):Promise<object>{
        try{
            await this.movieModel.deleteOne({episode_id:episode_id});
        }catch(e){
            throw new ConflictException(e)
        }
        return {status:'OK' , message:'Movie deleted succesfully'}
    }
    async updateMovie(data:UpdateDto):Promise<object>{
        try{
            await this.movieModel.findOneAndUpdate({episode_id:data.episode_id} , data.update , {new:true} )
        }catch(e){
            throw new ConflictException(e)
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

    async getById(id:string):Promise<MovieDto>{
        const idMovie = parseInt(id);
        if(idMovie < 6){
            const movies = await this.getExternalMovies()
            const filteredMovie = movies.find((movie)=>movie.episode_id === idMovie);
            const response:MovieDto={
                title:filteredMovie.title , 
                episode_id:filteredMovie.episode_id,
                director:filteredMovie.director,
                producer:filteredMovie.producer,
                release_date:filteredMovie.release_date
            }
            return response
        }
        try{
            const movie = await this.movieModel.findOne({episode_id:idMovie})
            if(!movie){
                throw new ConflictException('Movie doesnt exist')
            }
            return movie
        }catch(e){
            throw new ConflictException(e)
        }
    }

    async getExternalMovies():Promise<any[]>{
        const httpsAgent = new Agent({rejectUnauthorized:false}); // EL CERTIFICADO DE LA API SE VENCIO DURANTE LAS PRUEBAS POR ESO ESTA LINEA
        return (await axios.get(STARWARS_API , {httpsAgent:httpsAgent})).data?.results;
    }

    async getOneExternalMovie(id:string):Promise<any>{
        const httpsAgent = new Agent({rejectUnauthorized:false}); // EL CERTIFICADO DE LA API SE VENCIO DURANTE LAS PRUEBAS POR ESO ESTA LINEA
        return (await axios.get(STARWARS_API + `${id}` , {httpsAgent:httpsAgent})).data?.results;
    }
}
