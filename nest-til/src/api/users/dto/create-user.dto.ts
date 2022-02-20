import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserDomain } from '../entities/user';

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

  static from(entity: UserDomain): CreateUserResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      description: entity.description,
    };
  }
}
