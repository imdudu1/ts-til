import { PostgreSQL, FxSQL_DEBUG } from "fxsql";

describe("Select Tests", function () {
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

  test("특정 ID를 가지는 레코드를 조회", async function () {
    // Given
    const animal_id = "A666877";

    // When
    const columns = p.COLUMN("animal_id as id");
    const table = p.TABLE("animal_ins as ai");
    const cond = p.EQ({ animal_id });
    const [row] = await p.QUERY`SELECT ${columns} FROM ${table} WHERE ${cond}`;

    // Then
    expect(row.id).toEqual(animal_id);
  });

  test("아픈 동물 찾기", async function () {
    // Given
    const intake_condition = "Sick";

    // When
    const columns = p.CL("intake_condition");
    const table = p.TB("animal_ins as ai");
    const cond = p.EQ({ intake_condition });
    const rows = await p.QUERY`SELECT ${columns} FROM ${table} WHERE ${cond}`;

    // Then
    expect(rows.length).toBeGreaterThan(2);
    expect(rows[0].intake_condition).toEqual(intake_condition);
  });
});
