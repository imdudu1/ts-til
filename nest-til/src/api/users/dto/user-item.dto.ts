import { User } from '../entities/user.entity';

export class UserItemDto {
  name: string;
  email: string;
  description: string;

  static from(entity: User): UserItemDto {
    return {
      description: entity.description,
      email: entity.email,
      name: entity.name,
    };
  }
}
