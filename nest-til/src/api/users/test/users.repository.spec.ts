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

  it('사용자 엔티티를 저장한다.', async () => {
    const name = 'sample';
    const email = 'sample@example.com';
    const description = 'sudo rm -rf /';

    const param = User.create(name, email, description);

    const entity = await repository.save(param);

    expect(entity.id).toBeTruthy();
    expect(entity.name).toBe(name);
    expect(entity.email).toBe(email);
    expect(entity.description).toBe(description);
  });
});
