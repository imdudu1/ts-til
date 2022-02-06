import { Injectable } from '@nestjs/common';
import { CreateMovieDto, UpdateMovieDto } from './dto';
import { MovieItemResponse } from './dto/movie-item.dto';
import { MoviesRepository } from './movies.repository';

@Injectable()
export class MoviesService {
  constructor(private readonly moviesRepository: MoviesRepository) {}

  async create(createMovieDto: CreateMovieDto): Promise<MovieItemResponse> {
    return MovieItemResponse.of(
      await this.moviesRepository.create(createMovieDto),
    );
  }

  async findAll(): Promise<MovieItemResponse[]> {
    return (await this.moviesRepository.findAll()).map(MovieItemResponse.of);
  }

  async findOne(id: number): Promise<MovieItemResponse> {
    return MovieItemResponse.of(await this.moviesRepository.findOne(id));
  }

  async update(
    id: number,
    updateMovieDto: UpdateMovieDto,
  ): Promise<MovieItemResponse> {
    const target = await this.moviesRepository.findOne(id);
    target.update(updateMovieDto.title);
    return MovieItemResponse.of(await this.moviesRepository.update(target));
  }

  remove(id: number) {
    return this.moviesRepository.remove(id);
  }
}
