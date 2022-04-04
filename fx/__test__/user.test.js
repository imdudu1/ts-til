import { PostgreSQL, FxSQL_DEBUG } from "fxsql";
import { go, mapL, take, take1, takeL } from "fxjs";
import { User } from "../src/entities/user.entity";

describe("User Tests", function () {
  let p;

  beforeAll(function () {
    FxSQL_DEBUG.LOG = true;

    const { CONNECT } = PostgreSQL;
    p = CONNECT({
      host: "localhost",
      user: "postgres",
      password: "pgpass",
      database: "postgres",
    });
  });

  afterAll(function () {
    p.END();
  });

  describe("Associations", function () {
    test("전체 사용자 조회", async () => {
      /*
      given
      - select * from users order by id limit 10
       */
      const query = p.QUERY`select ${p.COLUMN("*")} from ${p.TABLE(
        "users"
      )} order by id limit 10`;

      // when
      const [user] = await go(query, mapL(User.fromEntity), take1);

      // then
      expect(user.id).toBe(1);
      expect(user.isDeleted()).toBeFalsy();
    });

    describe("이메일로 사용자 찾기", () => {
      test("존재하는 이메일을 조회한 경우 해당 사용자를 돌려준다", async () => {
        /*
        given
        - select * from users where email = ?
         */
        const [user] = await go(
          p.QUERY`select ${p.CL("*")} from ${p.TB("users")} where ${p.EQ({
            email: "daron89@example.com",
          })}`,
          mapL(User.fromEntity),
          take1
        );

        expect(user.id).toBe(2);
      });

      test("존재하지 않는 이메일을 조회한 경우 undefined을 반환한다", async () => {
        const [user] = await go(
          p.QUERY`select ${p.CL("*")} from ${p.TB("users")} where ${p.EQ({
            email: "invalidemail@no.user",
          })}`,
          mapL(User.fromEntity),
          take1
        );

        expect(user).toBeUndefined();
      });
    });
  });
});
