import { UserDomain } from '../domain/user';

export const mockUserDomain = (
  name: string,
  email: string,
  description: string,
): UserDomain => {
  return UserDomain.create({
    id: 1,
    name,
    email,
    description,
  });
};
