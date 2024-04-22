import { ConflictException } from '@nestjs/common';
import { Model } from 'mongoose';
import { MoviesService } from '../movies.service';
import { Movie } from '../../database/schemas/movie.schema';

describe('MoviesService', () => {
  let moviesService: MoviesService;
  let movieModelMock: Model<Movie>;

  beforeEach(() => {
    movieModelMock = {
      findOne: jest.fn(),
      find: jest.fn(),
      create: jest.fn(),
      deleteOne: jest.fn(),
      findOneAndUpdate: jest.fn(),
    } as unknown as Model<Movie>;
    moviesService = new MoviesService(movieModelMock);
  });

  describe('createMovie', () => {
    it('should create a new movie', async () => {

      const moviedata: any = { title: 'Test Movie', episode_id: 1 , director:'George pruebas' , producer:'test brothers' , release_date: new Date() }; // Inserta los datos necesarios aquí

      jest.spyOn(moviesService, 'getExternalMovies').mockResolvedValue([]);
      jest.spyOn(movieModelMock, 'findOne').mockResolvedValue(null);
      jest.spyOn(movieModelMock.prototype, 'save').mockResolvedValue(
        { title: 'Test Movie', episode_id: 1 , director:'George pruebas' , producer:'test brothers' , release_date: new Date() } as Movie
        );


      const result = await moviesService.createMovie(moviedata);


      expect(result.title).toEqual(moviedata.title);
      expect(result.episode_id).toEqual(moviedata.episode_id);
      expect(result.director).toEqual(moviedata.director);
      expect(result.producer).toEqual(moviedata.producer);
      expect(result.release_date).toEqual(moviedata.release_date);
    });

    it('should throw ConflictException if episode_id is already used', async () => {

      const moviedata: any = { title: 'Test Movie', episode_id: 1 }; 
      const existingMovie: any = { title: 'Existing Movie', episode_id: 1 };

      jest.spyOn(moviesService, 'getExternalMovies').mockResolvedValue([]);
      jest.spyOn(movieModelMock, 'findOne').mockResolvedValue(existingMovie);

      await expect(moviesService.createMovie(moviedata)).rejects.toThrowError(ConflictException);
    });
  });

  // Agrega más tests para otros métodos de MoviesService si es necesario

});