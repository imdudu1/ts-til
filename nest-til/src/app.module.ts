import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from './api/movies/movies.module';
import { UsersModule } from './api/users/users.module';

@Module({
  imports: [MoviesModule, UsersModule, TypeOrmModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
