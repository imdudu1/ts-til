import { User } from '../entities/user.entity';

export class UserItem {
  name: string;
  email: string;
  description: string;

  static from(entity: User): UserItem {
    return {
      description: entity.description,
      email: entity.email,
      name: entity.name,
    };
  }
}
