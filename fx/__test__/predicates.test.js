import {
  all,
  and,
  any,
  both,
  cond,
  either,
  equals,
  equals2,
  equalsBy,
  every,
  gt,
  gte,
  has,
  identity,
  ifElse,
  isArray,
  isFunction,
  isIterable,
  isUndefined,
  lt,
  lte, match,
  merge,
  range,
  rangeL,
  some,
  when,
} from "fxjs";
import Equals from "fxjs/Strict/equals";

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

  test("Either", () => {
    const isStr = (s) => typeof s === "string";
    const isNumber = (n) => typeof n === "number";

    expect(either(isStr, isNumber, 1)).toBeTruthy();
    expect(either(isStr, isNumber, class {})).toBeFalsy();
  });

  describe("equals", () => {
    test("equals", () => {
      expect(equals(1, 1)).toBeTruthy();
      expect(equals(1, 2)).toBeFalsy();
    });

    test("equals2", () => {
      expect(equals2(1, true)).toBeTruthy();
      expect(equals2(0, false)).toBeTruthy();
    });

    test("equalsBy", () => {
      const isString = (v) => typeof v === "string";

      expect(equalsBy(isString, "1", "2")).toBeTruthy();
      expect(equalsBy(isString, "1", 1)).toBeFalsy();
    });
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

  test("Every", () => {
    expect(every(identity, false)).toBeFalsy();
    expect(every(identity, [1, 2, 3, 4, false])).toBeFalsy();
    expect(every(identity, [1, 2, 3, 4])).toBeTruthy();
  });

  describe("Compares", () => {
    test("gt", () => {
      expect(gt(1, 2)).toBeFalsy();
      expect(gt(2, 1)).toBeTruthy();
      expect(gt(2, 2)).toBeFalsy();
    });

    test("gte", () => {
      expect(gte(2, 2)).toBeTruthy();
    });

    test("lt", () => {
      expect(lt(1, 1)).toBeFalsy();
      expect(lt(1, 2)).toBeTruthy();
    });

    test("lte", () => {
      expect(lte(1, 1)).toBeTruthy();
      expect(lte(1, 2)).toBeTruthy();
    });
  });

  test("isArray", () => {
    expect(isArray([])).toBeTruthy();
    expect(isArray(1)).toBeFalsy();
  });

  test("isFunction", () => {
    expect(isFunction(() => {})).toBeTruthy();
    expect(isFunction(function () {})).toBeTruthy();
  });

  test("isIterable", () => {
    expect(isIterable([1, 2, 3, 4])).toBeTruthy();
    expect(isIterable(rangeL(10))).toBeTruthy();
  });

  test("isUndefined", () => {
    expect(isUndefined(undefined)).toBeTruthy();
    expect(isUndefined(null)).toBeFalsy();
    expect(isUndefined(false)).toBeFalsy();
  });

  test("some", () => {
    expect(some(identity, [1, 2, 3, 4])).toBeTruthy();
    expect(some(identity, [0, null, undefined, false])).toBeFalsy();
    expect(some(identity, [true, 0, null, undefined, false])).toBeTruthy();
  });

  test("merge", () => {
    expect(merge([1, 2, 3])()).toStrictEqual({'0': 1, '1': 2, '2': 3});
  });

  test('match', () => {
    const m =
      match()
        .case(10, (v) => v * 10)
        .case(11, (v) => v + 1)
        .else(() => 100);

    expect(m(10)).toBe(100);
    expect(m(11)).toBe(12);
    expect(m(12)).toBe(100);
  })
});
