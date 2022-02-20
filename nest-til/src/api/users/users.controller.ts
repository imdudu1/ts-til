import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  CreateUserResponseDto,
  PaginationDto,
  SearchUsersDto,
  UpdateUserDto,
  UserItemDto,
} from './dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(
    @Query() searchUserDto: SearchUsersDto,
  ): Promise<PaginationDto<UserItemDto>> {
    return this.usersService.findAll(searchUserDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);
    if (!user) {
      throw new NotFoundException();
    }
    return UserItemDto.from(user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
