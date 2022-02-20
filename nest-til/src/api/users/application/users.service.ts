import { Injectable } from '@nestjs/common';
import { User } from '../domain/repository/entities/user.entity';
import { UsersRepository } from '../domain/repository/users.repository';
import { UserDomain } from '../domain/user';
import {
  CreateUserHttpReqDto,
  PaginationDto,
  SearchUsersDto,
  UpdateUserDto,
  UserItemDto,
} from '../dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUser: UserDomain): Promise<UserDomain> {
    return this.usersRepository.save(createUser);
  }

  async findAll(
    searchUsersDto: SearchUsersDto,
  ): Promise<PaginationDto<UserItemDto>> {
    const [users, count] = await this.usersRepository.findAll(searchUsersDto);
    return new PaginationDto<UserItemDto>(
      users,
      count,
      searchUsersDto.pageSize,
    );
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findById(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
