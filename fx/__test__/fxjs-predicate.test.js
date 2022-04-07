import { all, and, any, both } from "fxjs";

describe("Predicate Tests", () => {
  test("all", () => {
    // given

    // when

    // then
    expect(all([1, 2, 3])).toBeTruthy();
    expect(all[(1, 2, 3, false)]).toBeFalsy();
  });

  test("and", () => {
    expect(and(true, true)).toBeTruthy();
    expect(and(true, false)).toBeFalsy();
    expect(and(false, true)).toBeFalsy();
    expect(and(false, false)).toBeFalsy();
  });

  test("any", () => {
    expect(any([false, null, undefined, 0])).toBeFalsy();
    expect(any([true, false, null, undefined, 0])).toBeTruthy();
  });

  test("both", () => {
    const fn1 = (a) => a === 0;
    const fn2 = (b) => b;

    expect(both(fn1, fn2, [0])).toBeTruthy();
  });
});
