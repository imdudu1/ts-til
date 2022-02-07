import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../src/api/users/users.module';
import * as request from 'supertest';
import { User } from '../src/api/users/entities/user.entity';
import { getRepository, Repository } from 'typeorm';

describe('User (e2e)', () => {
  let app: INestApplication;
  let usersRepository: Repository<User>;

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
          entities: [User],
          synchronize: true,
        }),
        UsersModule,
      ],
    }).compile();

    usersRepository = getRepository(User);

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await usersRepository.clear();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/users POST', () => {
    it('이름, 이메일, 비밀번호, 자기소개를 받아 사용자를 생성한다.', async () => {
      const name = 'sample user';
      const email = 'sample@example.com';
      const description = 'sudo';

      const res = await request(app.getHttpServer()).post(`/users`).send({
        name,
        email,
        description,
      });

      expect(res.statusCode).toBe(201);
      expect(res.body.id).toBeTruthy();
      expect(res.body.name).toBe(name);
      expect(res.body.email).toBe(email);
      expect(res.body.description).toBe(description);
    });
    it.todo('잘못된 값을 요청한 경우 400 Bad Request 를 반환한다.');
  });
  describe('/users/:id GET', () => {
    it.todo('사용자 아이디를 통해 특정 사용자를 조회한다.');
    it.todo('없는 사용자 아이디를 조회하면 404 Not found 를 반환한다.');
  });
  describe('/users GET', () => {
    it.todo('전체 사용자를 조회한다.');
  });
  describe('/users/:id PATCH', () => {
    it.todo('사용자 정보를 갱신한다.');
    it.todo('없는 사용자에 대해 요청한 경우 404 Not found 를 반환한다.');
    it.todo('잘못된 값을 요청한 경우 400 Bad Request 를 반환한다.');
  });
  describe('/users/:id DELETE', () => {
    it.todo(
      '사용자를 성공적으로 제거한 경우 204 No Content 와 사용자 이름을 반환한다.',
    );
    it.todo('없는 사용자에 대해 요청한 경우 404 Not found 를 반환한다.');
  });
});
