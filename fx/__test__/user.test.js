import {PostgreSQL, FxSQL_DEBUG} from "fxsql";
import {go, mapL, take1} from "fxjs";
import {User} from "../src/entities/user.entity";

describe("User Tests", function () {
  let p;

  beforeAll(function () {
    FxSQL_DEBUG.LOG = true;

    const {CONNECT} = PostgreSQL;
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
            email: "cd80@kakao.com",
          })}`,
          mapL(User.fromEntity),
          take1
        );

        expect(user.id).toBe(1);
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

    describe("AS 모듈 사용하기", () => {
      it("", async () => {
        const postModuleHook = v => {
          console.log(`first hook> ${JSON.stringify(v)}`);
          return v;
        }
        const userModuleHook = v => {
          console.log(`second hook> ${JSON.stringify(v)}`)
          return v;
        }
        const result = await p.ASSOCIATE`
        posts ${{
          table: 'posts',
          column: p.CL('title', 'content'),
          hook: postModuleHook
        }}
          - user ${{
          table: 'users',
          column: p.CL('name', 'email'),
          hook: userModuleHook
        }}
        `
        expect(result).toBeTruthy();
      })
    })
  });

  describe("슬로우 쿼리에 대한 테스트", () => {
    it("두 쿼리는 병렬적으로 수행된다.", async () => {
      const sql1 = p.QUERY`SELECT pg_sleep(3);`;
      const sql2 = p.QUERY`SELECT pg_sleep(3);`;

      const [result1, result2] = await Promise.all([sql1, sql2]);

      console.log(result1);
      console.log(result2);
    });
  });
});
