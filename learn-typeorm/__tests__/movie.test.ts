import connection from '../src/connection';
import { Movie } from '../src/database/entities/movie.entity';
import { getRepository } from 'typeorm';
import { Director } from '../src/database/entities/director.entity';
import { map, pipe, range, toArray } from '@fxts/core';
import { User } from '../src/database/entities/user.entity';
import { Genre } from '../src/database/entities/genre.entity';

describe('Movie Tests', function () {
  beforeAll(async () => {
    await connection.create();
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
  });

  async function userSetup() {
    const users = pipe(
      range(100),
      map(n => {
        const result = new User();
        result.nickname = `nickname${n}`;
        result.email = `nickname${n}@example.com`;
        return result;
      }),
      toArray,
    );
    await getRepository(User).save(users);
    return users;
  }

  async function genreSetup() {
    const genres = pipe(
      range(100),
      map(n => {
        const genre = new Genre();
        genre.name = `genre${n}`;
        return genre;
      }),
      toArray,
    );
    await getRepository(Genre).save(genres);
    return genres;
  }

  test('save movie', async function () {
    const users = await userSetup();
    const genres = await genreSetup();

    const director = new Director();
    director.name = 'bitcake0';
    await getRepository(Director).save(director);

    const movie = new Movie();
    movie.title = 'Hello, World!!';
    movie.price = 39800;
    movie.director = director;
    movie.recommendations = users;
    movie.genres = genres;
    await getRepository(Movie).save(movie);

    const findMovie = await getRepository(Movie).findOneOrFail({
      relations: ['director', 'recommendations', 'genres'],
    });
    expect(findMovie.id).toBe(movie.id);
    expect(findMovie.director.name).toBe(director.name);
  });
});
