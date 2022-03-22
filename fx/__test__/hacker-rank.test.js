import { FxSQL_DEBUG, PostgreSQL } from "fxsql";

describe("Hacker rank SQL Solves", function () {
  let p;

  beforeAll(function () {
    FxSQL_DEBUG.LOG = true;

    const { CONNECT } = PostgreSQL;
    p = CONNECT({
      host: "localhost",
      user: "postgres",
      password: "testpw",
      database: "postgres",
    });
  });

  afterAll(function () {
    p.END();
  });

  test("Contest Leaderboard", function () {
    const sql = ``;
  });
});
