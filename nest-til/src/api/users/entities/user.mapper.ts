import { UserDomain } from './user';
import { User } from './user.entity';

export class UserMapper {
  static toDomain(entity: User): UserDomain {
    const { id, name, email, description } = entity;
    return UserDomain.create({
      id,
      name,
      email,
      description,
    });
  }

  static toEntity(domain: UserDomain): User {
    const { id, name, email, description } = domain;
    const entity = new User();
    entity.id = id;
    entity.name = name;
    entity.email = email;
    entity.description = description;
    return entity;
  }
}
