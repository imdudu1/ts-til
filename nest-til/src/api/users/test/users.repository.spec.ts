import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import connection from '../../../../test/infra/connection';
import { getRepository } from 'typeorm';
import { User } from '../domain/repository/entities/user.entity';
import { UsersRepository } from '../domain/repository/users.repository';
import { SearchUsersDto } from '../dto/search-users.dto';
import { UserDomain } from '../domain/user';

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
    const param = UserDomain.create({ name, email, description });

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

    const param = await repository.save(
      UserDomain.create({ name, email, description }),
    );

    // WHEN
    const findUser = await repository.findById(param.id);

    // THEN
    expect(findUser.id).toBe(param.id);
    expect(findUser.name).toBe(param.name);
  });

  it('사용자 목록을 조회한다.', async () => {
    const users = [];
    const totalUserCount = 10;
    for (let i = 0; i < totalUserCount; i++) {
      users.push(User.create(`user${i}`, `example${i}@example.com`, 'hello'));
    }
    await getRepository(User).save(users);

    // GIVEN
    const pageSize = 3;
    const dto = new SearchUsersDto();
    dto.page = 1;
    dto.pageSize = pageSize;

    // WHEN
    const [findUsers, count] = await repository.findAll(dto);

    // THEN
    expect(findUsers).toHaveLength(pageSize);
    expect(count).toBe(totalUserCount);
  });
});
