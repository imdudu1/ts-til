import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie, Tag } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Tag])],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
