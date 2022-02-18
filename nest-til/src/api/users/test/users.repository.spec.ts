import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import connection from '../../../../test/infra/connection';
import { getRepository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../users.repository';

describe('UsersRepository', () => {
  let repository: UsersRepository;

  beforeAll(async () => {
    await connection.create([User]);
  });

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersRepository,
        {
          provide: getRepositoryToken(User),
          useValue: getRepository(User),
        },
      ],
    }).compile();

    repository = moduleRef.get<UsersRepository>(UsersRepository);
  });

  afterEach(async () => {
    await connection.clear();
  });

  afterAll(async () => {
    await connection.close();
  });

  it('사용자 엔티티를 저장한다.', async () => {
    // GIVEN
    const name = 'sample';
    const email = 'sample@example.com';
    const description = 'sudo rm -rf /';
    const param = User.create(name, email, description);

    // WHEN
    const entity = await repository.save(param);

    // THEN
    expect(entity.id).toBeTruthy();
    expect(entity.name).toBe(name);
    expect(entity.email).toBe(email);
    expect(entity.description).toBe(description);
  });

  it('사용자를 조회한다.', async () => {
    // GIVEN
    const name = 'sample';
    const email = 'sample@example.com';
    const description = 'sudo rm -rf /';

    const param = User.create(name, email, description);
    await repository.save(param);

    // WHEN
    const findUser = await repository.findById(param.id);

    // THEN
    expect(findUser.id).toBe(param.id);
  });
});
