import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserDomain } from '../domain/user';

export class CreateUserHttpReqDto {
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  toDomain(): UserDomain {
    return new UserDomain();
  }
}

export class CreateUserHttpResDto {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly description: string;

  static from(entity: UserDomain): CreateUserHttpResDto {
    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      description: entity.description,
    };
  }
}
