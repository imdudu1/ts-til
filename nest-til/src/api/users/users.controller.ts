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
import { CreateUserDto, CreateUserResponseDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserItem } from './dto/user-item';
import { SearchUsersDto } from './dto/search-users.dto';
import { PaginationDto } from './dto/pagination.dto';

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
  ): Promise<PaginationDto<UserItem>> {
    return this.usersService.findAll(searchUserDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(+id);
    if (!user) {
      throw new NotFoundException();
    }
    return UserItem.from(user);
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
