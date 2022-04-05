import { FxSQL_DEBUG, PostgreSQL } from "fxsql";
import {
  curry,
  flat,
  flatten,
  go,
  mapC,
  mapL,
  take1,
  takeAll,
  takeAllC,
} from "fxjs";
import { Category } from "../src/entities/category.entity";
import { Course } from "../src/entities/course.entity";

describe("Category Tests", () => {
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

  test("해당 카테고리의 모든 강의 출력", async () => {
    const toDomain = ({ _: { courses: _courses }, ..._category }) => {
      const category = Category.fromEntity(_category);
      const courses = go(_courses, mapL(Course.fromEntity), takeAll);

      return {
        category,
        courses,
      };
    };

    const [result] = await go(
      p.ASSOCIATE`
      categories ${p.SQL`WHERE id = 1`}
        < courses
    `,
      mapL(toDomain),
      flatten,
      take1
    );

    expect(result.category.id).toBe(1);
    expect(result.courses.length).toBe(5);
  });
});
