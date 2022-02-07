import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { UsersRepository } from '../users.repository';
import { mockUser } from './user';

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const mockUsersRepository = {
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(usersRepository).toBeDefined();
  });

  it('사용자를 생성한다.', async () => {
    const name = 'simple user';
    const email = 'simple@example.com';
    const description = 'sudo rm -rf /';

    jest
      .spyOn(usersRepository, 'save')
      .mockResolvedValue(mockUser(name, email, description));

    const dto = {
      name,
      email,
      description,
    };
    const res = await service.create(dto);

    expect(res).toStrictEqual({
      id: 1,
      name,
      email,
      description,
    });
  });
});
