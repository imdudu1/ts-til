import {
  adjust,
  apply,
  applyEach,
  applyMethod,
  call,
  callEach,
  constant,
  curry,
  curryN,
  go,
  juxt,
  max,
  mean,
  min,
  negate,
  once,
  pipe,
  sum,
  tap,
  bindMethod, callMethod, debounce, throttle,
} from "fxjs";
import {re} from "@babel/core/lib/vendor/import-meta-resolve";

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
    // given
    const fn = (a, b) => a + b;
    const input = [10, 20];

    // when
    const result = apply(fn, input);

    // then
    expect(result).toBe(30);
  });

  test("applyEach", function () {
    // given
    const addAll = (a, b, c) => a + b + c;
    const multipleAll = (a, b, c) => a * b * c;
    const input = [2, 3, 4];

    // when
    const [result1, result2] = applyEach([addAll, multipleAll], input);

    // then
    expect(result1).toBe(9);
    expect(result2).toBe(24);
  });

  test("applyMethod", function () {
    const result = applyMethod(
      "add",
      {add: (a, b, c = 0) => a + b + c},
      [1, 2]
    );

    expect(result).toBe(3);
  });

  test("bindMethod", function () {
    // given
    const NumericUtils = {
      add: (value) => {
        return value + 10;
      }
    };
    const StringUtils = {
      add: (name) => {
        return `INFLAB::${name}`;
      }
    };
    const methodName = "add";
    const addBindAdapter = bindMethod(methodName);

    // when
    const result1 = addBindAdapter(NumericUtils, 1)();
    const result2 = addBindAdapter(StringUtils, "YOHAN")();

    // then
    expect(result1).toBe(11);
    expect(result2).toBe("INFLAB::YOHAN");
  });

  describe("call", function () {
    test("call", function () {
      // given
      const add = (a, b) => a + b;
      const input = [1, 2];

      // when
      const result = call(add)(...input);

      // then
      expect(result).toBe(3);
    });

    test("callEach", async function () {
      // given
      const args = 10;
      const addOne = value => value + 1;
      const addFive = value => value + 5;
      const asyncAddTen = value => Promise.resolve(value + 10);

      // when
      const [r1, r2, r3] = await callEach(
        [addOne, addFive, asyncAddTen],
        args
      );

      // then
      expect(r1).toBe(11);
      expect(r2).toBe(15);
      expect(r3).toBe(20);
    });

    test("callMethod", function () {
      // given
      const StringUtils = {
        add: (prefix, name) => `${prefix}::${name}`
      }
      const methodName = "add";

      // when
      const result = callMethod(methodName, StringUtils, "INFLAB", "YOHAN");

      // then
      expect(result).toBe("INFLAB::YOHAN");
    });
  });

  test("constant", function () {
    // Given
    const ten = 10;

    // When
    const willReturnTen = constant(value);

    // Then
    expect(willReturnTen()).toBe(10);
  });

  describe("curry", function () {
    test("curry", function () {
      // given
      const add = curry((a, b) => a + b);
      const add10 = add(10);

      // when
      const result1 = add10(1);
      const result2 = add10(2);

      // then
      expect(result1).toBe(11);
      expect(result2).toBe(12);
    });

    test("curryN", function () {
      // given
      const addAll = (...args) => args.reduce((p, c) => p + c);
      const N = 2;

      // when
      const sum = curryN(N, addAll);

      // then
      expect(sum(1)(2)(3)).toBe(6);
    });
  });

  test("go", function () {
    expect(
      go(
        10,
        (a) => a + 1,
        (a) => a + 10
      )
    ).toBe(21);
  });

  test("debounce", function () {
    // given
    const millisecond = 5000;
    const requestAPI = jest.fn();
    const clickMe = debounce(_ => {
      requestAPI();
    }, millisecond)

    // when
    for (let i = 0; i < 1000; i++) {
      clickMe();
    }

    // then
    expect(requestAPI).toBeCalledTimes(0);
  });

  test("juxt", function () {
    // Given
    const compute = juxt(min, max, sum, mean);
    const numbers = [1, 2, 3, 4, 5];

    // When
    const result = compute(numbers);

    // Then
    expect(result).toStrictEqual([1, 5, 15, 3]);
  });

  test("negate", function () {
    // given
    const truthy = constant(true);
    const falsy = negate(truthy);

    // when
    const result1 = truthy();
    const result2 = falsy();

    // Then
    expect(result1).toBe(true);
    expect(result2).toBe(false);
  });

  test("once", function () {
    // given
    const fn = once((a) => a + 10);

    // when
    const result = fn(10);

    // then
    expect(result).toBe(20);
  });

  test("pipe", function () {
    // given
    const toUpperCase = char => char.toUpperCase();
    const isA = char => char === "A";

    // when
    const validate = pipe(toUpperCase, isA);

    // then
    expect(validate("A")).toBeTruthy();
  });

  test("tap", function () {
    //given

    // when
    const result = go(
      10,
      (a) => a + 5, // 15
      tap((a) => a + 5), // 이후 연산에 영향을 주지않음
      (a) => a + 10, // 25
    );

    // then
    expect(result).toBe(25)
  });

  test("Throttling", function () {
    // given
    const millisecond = 5000;
    const requestAPI = jest.fn();
    const clickMe = throttle(requestAPI, millisecond);

    // when
    for (let i = 0; i < 1000; i++) {
      clickMe();
    }

    // then
    expect(requestAPI).toBeCalledTimes(1);
  });
});
