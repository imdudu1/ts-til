import { User } from '../entities/user.entity';

export class CreateUserDto {
  readonly name: string;
  readonly email: string;
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
