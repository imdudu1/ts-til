import {
  add,
  countBy,
  delay,
  each,
  filter,
  filterL,
  flat,
  go,
  identity,
  intervalL,
  mapL,
  pipe,
  rangeL,
  reduce,
  takeAllC,
  takeC,
  takeL,
  takeUntilL,
  takeWhileL,
  tap,
} from "fxjs";

describe("", function () {
  test("Iterable programming", () => {
    expect(
      go(
        [1, 2, 3, 4, 5],
        filter((n) => n % 2),
        reduce(add)
      )
    ).toBe(9);
  });

  test("Lazy evaluation", () => {
    expect(
      go(
        rangeL(Infinity),
        filterL((n) => n % 2),
        takeL(3),
        reduce(add)
      )
    ).toBe(9);
  });

  test("FRP style", () => {
    expect(
      go(
        rangeL(Infinity),
        mapL(delay(1000)),
        mapL((n) => n + 10),
        takeL(3),
        each(console.log)
      )
    );
  });

  test("Promise/async/await", async () => {
    const result = await go(
      intervalL(1000),
      mapL((n) => n + 20),
      takeWhileL((n) => n < 23),
      mapL(tap(console.log)),
      reduce(add)
    );

    expect(result).toBe(63);
  });

  test("Concurrency", () => {
    const getPage = (l) => ({ line: l });

    const pages = [getPage(10), getPage(20), getPage(30), getPage(10)];

    const result = go(
      pages,
      filterL((page) => page.line < 10),
      takeAllC(2),
      flat,
      countBy(identity),
      console.log
    );
  });

  describe("Error handling", function () {
    test("Throw1", function () {
      try {
        expect(
          go(0, (_) => {
            throw new Error("throwable");
          })
        ).toThrow(Error);
      } catch (e) {
        expect(e.message).toBe("throwable");
      }
    });

    test("Promise throw", async function () {
      try {
        await go(
          0,
          (v) => Promise.resolve(v + 10),
          (_) => Promise.reject("throwable"),
          (v) => v + 100
        );
      } catch (e) {
        expect(e).toBe("throwable");
      }
    });
  });
});
