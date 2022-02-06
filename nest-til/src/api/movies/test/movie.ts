import { CreateMovieDto, UpdateMovieDto } from '../dto';
import { Movie, Tag } from '../entities';

export const mockUpdateMovieDto = (): UpdateMovieDto => ({
  title: 'anytitle',
});

export const mockCreateMovieDto = (): CreateMovieDto => ({
  title: 'anytitle',
  tags: ['action', 'comedy'],
});

export const mockMovie = (): Movie => Movie.create('anytitle', [mockTag()]);

export const mockTag = (): Tag => Tag.create('anytag');
