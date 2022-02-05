import { INestApplication } from '@nestjs/common';
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

    const tags = await Promise.all(
      tagNames.map((tag) => tagsRepo.save(Tag.create(tag))),
    );
    const movie = moviesRepo.create(Movie.create(title, tags));
    await moviesRepo.save(movie);

    const response = await request(app.getHttpServer()).get('/movies');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].title).toBe(title);
    expect(response.body[0].tags).toHaveLength(2);
    expect(response.body[0].tags).toEqual(expect.arrayContaining(tagNames));
  });

  it.todo('/movies POST');

  it.todo('/movies/:id PUT');

  it.todo('/movies/:id DELETE');
});
