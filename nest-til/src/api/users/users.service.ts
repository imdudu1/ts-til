import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, CreateUserResponseDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import { UserItem } from './dto/user-item';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
    return this.usersRepository
      .save(User.of(createUserDto))
      .then(CreateUserResponseDto.from);
  }

  async findAll(): Promise<UserItem[]> {
    const users = await this.usersRepository.findAll();
    return users.map(UserItem.from);
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
