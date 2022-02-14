import { User } from "../src/database/entities/user.entity";
import { getRepository } from "typeorm";
import connection from "../src/connection";

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.close();
});

beforeEach(async () => {
  await connection.clear();
});

test("creates a user", async () => {
  // Given
  const user = new User();
  user.email = "sample@example.com";
  user.nickname = "bitcake0";

  // When
  const newUser = await getRepository(User).save(user);

  // Then
  expect(newUser.id).toBeTruthy();
  expect(newUser.nickname).toBe("bitcake0");
  expect(newUser.email).toBe("sample@example.com");
});

test("get user", async () => {
  // Given
  const user = new User();
  user.email = "sample@example.com";
  user.nickname = "bitcake0";
  const newUser = await getRepository(User).save(user);

  // When
  const findUser = await getRepository(User).findOne(newUser.id);

  // Then
  expect(findUser.id).toBe(newUser.id);
  expect(findUser.email).toBe("sample@example.com");
  expect(findUser.nickname).toBe("bitcake0");
});

test("get users", async () => {
  const user = new User();
  user.email = "sample@example.com";
  user.nickname = "bitcake0";
  await getRepository(User).save(user);
  const user2 = new User();
  user2.email = "sample2@example.com";
  user2.nickname = "bitcake1";
  await getRepository(User).save(user2);

  const [users, count] = await getRepository(User).findAndCount();

  expect(users).toEqual([user, user2]);
  expect(count).toBe(2);
});

test("update user", async () => {
  // Given
  const user = new User();
  user.email = "sample@example.com";
  user.nickname = "bitcake0";
  const newUser = await getRepository(User).save(user);

  // When
  newUser.email = "sample@sample.com";
  await getRepository(User).save(newUser);
  const updatedUser = await getRepository(User).findOne(newUser.id);

  // Then
  expect(updatedUser.id).toBe(newUser.id);
  expect(updatedUser.email).toBe("sample@sample.com");
  expect(updatedUser.nickname).toBe("bitcake0");
});

test("delete user", async () => {
  // Given
  const user = new User();
  user.email = "sample@example.com";
  user.nickname = "bitcake0";

  expect(user.id).toBeUndefined();
  await getRepository(User).save(user);
  expect(user.id).toBeTruthy();

  // When
  await getRepository(User).delete(user.id);
  const findUser = await getRepository(User).findOne(user.id);

  // Then
  expect(findUser).toBeUndefined();
});
