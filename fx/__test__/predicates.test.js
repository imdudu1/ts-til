import {
  all,
  and,
  any,
  both,
  cond,
  either,
  has,
  identity,
  ifElse,
  when,
} from "fxjs";

describe("Predicates Tests", function () {
  test("All", () => {
    expect(all([1, true, "abcd"])).toBeTruthy();
    expect(all([1, false, "abcd"])).toBeFalsy();
  });

  test("And", () => {
    expect(and(true, false)).toBeFalsy();
    expect(and(true, true)).toBeTruthy();
    expect(and(false, false)).toBeFalsy();
  });

  test("Any", () => {
    expect(any(["", false, 0])).toBeFalsy();
    expect(any(["", false, 0, true])).toBeTruthy();
  });

  test("Both", () => {
    const f1 = (v) => 10 < v;
    const f2 = (v) => v % 2 === 0;
    expect(both(f1, f2, ...[12, 14, 16, 18])).toBeTruthy();
  });

  test("Cond", () => {
    const f1 = (v) => 10 < v;
    const f2 = (v) => v - 1;
    expect(cond([f1, f2])(12)).toBe(11);
  });

  test("When", () => {
    const odd = (v) => v % 2 !== 0;
    const fn = (v) => v + 1;
    expect(when(odd, fn, 9)).toBe(10);
  });

  test("IfElse", () => {
    const odd = (v) => v % 2 !== 0;
    const fn = (v) => v + 1;
    expect(ifElse(odd, fn, identity, 9)).toBe(10);
  });

  test("Has", () => {
    const obj = {
      age: 28,
      name: "yohan",
    };

    expect(has("age", obj)).toBeTruthy();
    expect(has("name", obj)).toBeTruthy();
    expect(has("address", obj)).toBeFalsy();
  });
});
