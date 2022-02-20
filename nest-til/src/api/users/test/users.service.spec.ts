import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { UsersRepository } from '../users.repository';
import { mockUserDomain } from './user';
import { User } from '../entities/user.entity';
import { SearchUsersDto } from '../dto/search-users.dto';
import spyOn = jest.spyOn;

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const mockUsersRepository = {
      save: jest.fn(),
      findById: jest.fn(),
      findAll: jest.fn(),
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
      .mockResolvedValue(mockUserDomain(name, email, description));

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

  it('ID를 통해 사용자를 조회한다.', async () => {
    const name = 'Byeongju, shin';
    const email = 'example@mail.com';
    const description = 'best programmers';

    const spy = jest
      .spyOn(usersRepository, 'findById')
      .mockResolvedValue(User.create(name, email, description));

    const user = await service.findOne(1);

    expect(spy).toBeCalledWith(1);
    expect(user.name).toBe(name);
    expect(user.email).toBe(email);
    expect(user.description).toBe(description);
  });

  it('사용자 목록을 조회한다.', async () => {
    const totalUserCount = 41;
    const pageSize = 20;
    spyOn(usersRepository, 'findAll').mockResolvedValue([[], totalUserCount]);

    // GIVEN
    const dto: SearchUsersDto = new SearchUsersDto();
    dto.page = 3;
    dto.pageSize = pageSize;

    // WHEN
    const body = await service.findAll(dto);

    // THEN
    expect(body.totalPage).toBe(3);
    expect(body.pageSize).toBe(pageSize);
    expect(body.totalCount).toBe(totalUserCount);
  });
});
