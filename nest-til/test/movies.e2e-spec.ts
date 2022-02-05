import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesModule } from '../src/api/movies/movies.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie, Tag } from '../src/api/movies/entities';
import { getRepository, Repository } from 'typeorm';

describe('Movie (e2e)', () => {
  let app: INestApplication;
  let moviesRepo: Repository<Movie>;
  let tagsRepo: Repository<Tag>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ envFilePath: '.env.test' }),
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: process.env.DB_HOST,
          port: Number(process.env.DB_PORT),
          username: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB_NAME,
          entities: [Movie, Tag],
          synchronize: true,
        }),
        MoviesModule,
      ],
    }).compile();

    moviesRepo = getRepository(Movie);
    tagsRepo = getRepository(Tag);

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    await moviesRepo.delete({});
    await tagsRepo.delete({});
  });

  afterAll(async () => {
    await app.close();
  });

  it('/movies GET', async () => {
    const tagNames = ['action', 'abcd'];
    const title = 'sample';

    const movie = await getMovieEntity(title, tagNames);

    await moviesRepo.save(movie);

    const response = await request(app.getHttpServer()).get('/movies');

    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].title).toBe(title);
    expect(response.body[0].tags).toHaveLength(2);
    expect(response.body[0].tags).toEqual(expect.arrayContaining(tagNames));
  });

  it('/movies POST', async () => {
    const response = await request(app.getHttpServer())
      .post('/movies')
      .send({ title: 'sample movie', tags: ['action', 'comedy'] });

    expect(response.statusCode).toBe(HttpStatus.CREATED);
    expect(response.body.title).toBe('sample movie');
    expect(response.body.tags).toHaveLength(2);
    expect(response.body.tags).toEqual(
      expect.arrayContaining(['action', 'comedy']),
    );
  });

  it('/movies/:id GET', async () => {
    const tagNames = ['action', 'abcd'];
    const title = 'sample';

    const movie = await getMovieEntity(title, tagNames);

    const response = await request(app.getHttpServer()).get(
      `/movies/${movie.id}`,
    );

    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body.title).toBe(title);
    expect(response.body.tags).toHaveLength(2);
    expect(response.body.tags).toEqual(expect.arrayContaining(tagNames));
  });

  it('/movies/:id PATCH', async () => {
    const tagNames = ['action', 'abcd'];
    const title = 'sample';

    const movie = await getMovieEntity(title, tagNames);

    const response = await request(app.getHttpServer())
      .patch(`/movies/${movie.id}`)
      .send({
        title: 'updated title',
      });

    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body.title).toBe('updated title');
  });

  it('/movies/:id DELETE', async () => {
    const tagNames = ['action', 'abcd'];
    const title = 'sample';

    const movie = await getMovieEntity(title, tagNames);

    const response = await request(app.getHttpServer()).delete(
      `/movies/${movie.id}`,
    );

    expect(response.statusCode).toBe(HttpStatus.OK);
  });

  async function getMovieEntity(title: string, tags: string[]) {
    const tagEntities = await Promise.all(
      tags.map((tag) => tagsRepo.save(Tag.create(tag))),
    );
    return moviesRepo.save(moviesRepo.create(Movie.create(title, tagEntities)));
  }
});
