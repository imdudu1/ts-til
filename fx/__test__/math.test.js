import { FxSQL_DEBUG, PostgreSQL } from "fxsql";

describe("SUM, MAX, MIN Tests", function () {
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

  test("최댓값 구하기", async function () {
    // Given

    // When
    const [{ max }] = await p.QUERY`SELECT MAX(${p.COLUMN(
      "datetime"
    )}) FROM ${p.TABLE("animal_ins")}`;

    // Then
    expect(max).toBeTruthy();
  });

  test("최솟값 구하기", async function () {
    // Given

    // When
    const [{ min }] = await p.QUERY`SELECT MIN(${p.CL("datetime")}) FROM ${p.TB(
      "animal_ins"
    )}`;

    // Then
    expect(min).toBeTruthy();
  });
});
