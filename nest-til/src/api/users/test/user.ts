import { User } from '../entities/user.entity';

export const mockUser = (
  name: string,
  email: string,
  description: string,
): User => {
  const user = new User();
  user.id = 1;
  user.name = name;
  user.email = email;
  user.description = description;
  return user;
};
