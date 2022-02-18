import { User } from '../entities/user.entity';

export class GetUserByIdResponseDto {
  name: string;
  email: string;
  description: string;

  static from(entity: User): GetUserByIdResponseDto {
    return {
      description: entity.description,
      email: entity.email,
      name: entity.name,
    };
  }
}
