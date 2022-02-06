import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateMovieDto, UpdateMovieDto } from './dto';
import { Movie, Tag } from './entities';

@Injectable()
export class MoviesRepository {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,
    @InjectRepository(Tag) private readonly tagsRepository: Repository<Tag>,
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = this.moviesRepository.create({
      title: createMovieDto.title,
      tags: await this.createTags(createMovieDto.tags),
    });
    return this.moviesRepository.save(movie);
  }

  private createTags(tags: string[]) {
    return Promise.all(
      tags.map((tag) => this.tagsRepository.save(Tag.create(tag))),
    );
  }

  async findAll(): Promise<Movie[]> {
    return this.moviesRepository.find();
  }

  async findOne(id: number): Promise<Movie> {
    return this.moviesRepository.findOne({ id });
  }

  async update(entity: Movie): Promise<Movie> {
    return this.moviesRepository.save(entity);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.moviesRepository.delete(id);
  }
}
