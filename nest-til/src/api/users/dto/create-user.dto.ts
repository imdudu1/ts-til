import { User } from '../entities/user.entity';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;
}

export class CreateUserResponseDto {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly description: string;

  static of(entity: User): CreateUserResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      description: entity.description,
    };
  }
}
