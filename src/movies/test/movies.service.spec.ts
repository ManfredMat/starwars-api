import { ConflictException } from '@nestjs/common';
import mongoose, { Document, Model } from 'mongoose';
import { MoviesService } from '../movies.service';
import { Movie } from '../../domain/database/schemas/movie.schema';

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
    
    it('should throw ConflictException if episode_id is already used', async () => {

      const moviedata: any = { title: 'Test Movie', episode_id: 1 }; 
      const existingMovie: any = { title: 'Existing Movie', episode_id: 1 };

      jest.spyOn(moviesService, 'getExternalMovies').mockResolvedValue([]);
      jest.spyOn(movieModelMock, 'findOne').mockResolvedValue(existingMovie);

      await expect(moviesService.createMovie(moviedata)).rejects.toThrowError(ConflictException);
    });
  });

});