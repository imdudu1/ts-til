import { Injectable } from '@nestjs/common';
import { CreateUserDto, CreateUserResponseDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import { GetUserByIdResponseDto } from './dto/get-user-by-id.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
    return this.usersRepository
      .save(User.of(createUserDto))
      .then(CreateUserResponseDto.from);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number): Promise<GetUserByIdResponseDto> {
    return this.usersRepository.findById(id).then(GetUserByIdResponseDto.from);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
