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
    const rows =
      await p.QUERY`SELECT ${columns} FROM ${table} WHERE ${cond} ORDER BY animal_id`;

    // Then
    expect(rows.length).toBeGreaterThan(2);
    expect(rows[0].intake_condition).toEqual(intake_condition);
  });

  test("어린 동물 찾기", async function () {
    // Given
    const intake_condition = "Aged";

    // When
    const cl = p.CL("animal_id as id", "name", "intake_condition as cond");
    const tb = p.TB("animal_ins");
    const eq = p.EQ({
      intake_condition,
    });
    const rows =
      await p.QUERY`SELECT ${cl} FROM ${tb} WHERE NOT ${eq} ORDER BY id`;

    // Then
    expect(rows.length).toBeGreaterThan(2);
  });

  test("동물의 아이디와 이름", async function () {
    // Given

    // When
    const cl = p.COLUMN("animal_id as id", "name");
    const tb = p.TABLE("animal_ins");
    const rows = await p.QUERY`SELECT ${cl} FROM ${tb} ORDER BY id`;

    // Then
    expect(rows.length).toBeGreaterThan(2);
  });

  test("여러 기준으로 정렬하기", async function () {
    // Given

    // When
    const cl = p.COLUMN("animal_id", "name", "datetime");
    const tb = p.TABLE("animal_ins");
    const rows =
      await p.QUERY`SELECT ${cl} FROM ${tb} ORDER BY name, datetime DESC`;

    // Then
    expect(rows.length).toBeGreaterThan(2);
  });

  test("상위 n개 레코드", async function () {
    // Given

    // When
    const cl = p.COLUMN("name");
    const tb = p.TABLE("animal_ins");
    const rows =
      await p.QUERY`SELECT ${cl} FROM ${tb} ORDER BY datetime LIMIT 1`;

    // Then
    expect(rows.length).toBe(1);
  });
});
