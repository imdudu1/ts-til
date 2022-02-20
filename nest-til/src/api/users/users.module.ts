import { Module } from '@nestjs/common';
import { UsersService } from './application/users.service';
import { UsersController } from './ui/users.http-controller';
import { UsersRepository } from './domain/repository/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/repository/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
