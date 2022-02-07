import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersRepository } from '../users.repository';
import { User } from '../entities/user.entity';
import { mockUser } from './user';

describe('UsersRepository', () => {
  let repository: UsersRepository;
  let ormMock: Repository<User>;

  beforeEach(async () => {
    const mockOrmRepository = {
      create: jest.fn(),
      save: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersRepository,
        {
          provide: getRepositoryToken(User),
          useValue: mockOrmRepository,
        },
      ],
    }).compile();

    repository = moduleRef.get<UsersRepository>(UsersRepository);
    ormMock = moduleRef.get(getRepositoryToken(User));
  });

  it('사용자 엔티티를 저장한다.', async () => {
    const name = 'sample';
    const email = 'sample@example.com';
    const description = 'sudo rm -rf /';

    jest
      .spyOn(ormMock, 'save')
      .mockResolvedValue(mockUser(name, email, description));

    const param = User.create(name, email, description);

    const entity = await repository.save(param);

    expect(entity.id).toBeTruthy();
    expect(entity.name).toBe(name);
    expect(entity.email).toBe(email);
    expect(entity.description).toBe(description);
  });
});
