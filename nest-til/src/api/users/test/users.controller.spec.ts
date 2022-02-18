import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { mockUser } from './user';
import { CreateUserResponseDto } from '../dto/create-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const mockUsersService = {
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('사용자를 생성한다.', async () => {
    const name = 'simple user';
    const email = 'simple@example.com';
    const description = 'sudo rm -rf /';

    jest
      .spyOn(usersService, 'create')
      .mockResolvedValue(
        CreateUserResponseDto.from(mockUser(name, email, description)),
      );

    const dto = {
      name,
      email,
      description,
    };

    const res = await controller.create(dto);

    expect(res).toStrictEqual({
      id: 1,
      name,
      email,
      description,
    });
  });
});
