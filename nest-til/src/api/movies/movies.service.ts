import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto, UpdateMovieDto } from './dto';
import { MovieItem } from './dto/movie-item.dto';
import { Movie, Tag } from './entities';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    const movie = Movie.create(
      createMovieDto.title,
      await this.createTags(createMovieDto.tags),
    );
    return this.moviesRepository.save(movie);
  }

  private createTags(tags: string[]) {
    return Promise.all(
      tags.map((tag) => this.tagsRepository.save(Tag.create(tag))),
    );
  }

  async findAll() {
    const movies = await this.moviesRepository.find();
    return movies.map(MovieItem.of);
  }

  async findOne(id: number) {
    const movie = await this.moviesRepository.findOne({ id });
    return movie.tags;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return this.moviesRepository.update({ id }, {});
  }

  remove(id: number) {
    return this.moviesRepository.delete({ id });
  }
}
