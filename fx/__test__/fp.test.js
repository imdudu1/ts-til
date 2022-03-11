import {
  apply,
  applyEach,
  applyMethod,
  call,
  callEach,
  constant,
  curry,
  curryN,
  go,
  sum,
} from "fxjs";

describe("FxJS function Tests", function () {
  test("go", function () {
    // Given
    const input = [1, 2, 3];

    // When
    const result = go(input);

    // Then
    expect(result).toEqual(input);
  });

  test("add", function () {
    const input = [1, 2, 3, 4];

    const result = sum(input);

    expect(result).toBe(10);
  });

  test("apply", function () {
    const fn = (a, b) => a + b;

    const input = [10, 20];

    const result = apply(fn, input);

    expect(result).toBe(30);
  });

  test("applyEach", function () {
    const input = [2, 3, 4];

    const addAll = (a, b, c) => a + b + c;
    const multipleAll = (a, b, c) => a * b * c;

    const [r1, r2] = applyEach([addAll, multipleAll], input);

    expect(r1).toBe(9);
    expect(r2).toBe(24);
  });

  test("applyMethod", function () {
    const result = applyMethod(
      "add",
      { add: (a, b, c = 0) => a + b + c },
      [1, 2]
    );

    expect(result).toBe(3);
  });

  describe("call", function () {
    test("call", function () {
      const add = (a, b) => a + b;

      const result = call(add)(1, 2);

      expect(result).toBe(3);
    });

    test("callEach", async function () {
      const args = 10;

      const [r1, r2, r3] = await callEach(
        [(a) => a + 1, (a) => a + 5, (_) => Promise.resolve(10)],
        args
      );

      expect(r1).toBe(11);
      expect(r2).toBe(15);
      expect(r3).toBe(10);
    });
  });

  test("constant", function () {
    // Given

    // When
    const v = constant(10);

    // Then
    expect(v()).toBe(10);
  });

  describe("curry", function () {
    test("curry", function () {
      const add = curry((a, b) => a + b);

      const add10 = add(10);

      expect(add10(10)).toBe(20);
      expect(add10(20)).toBe(30);
    });

    test("curryN", function () {
      const addAll = (...args) => args.reduce((p, c) => p + c);

      const add1 = curryN(1, addAll);

      expect(add1(1)(2)).toBe(3);
      expect(() => add1(1)(2)(3)).toThrow();
    });
  });
});
