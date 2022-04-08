import { goS, pipeS, reduceS, stop, stopIf } from "fxjs";

describe("Stoppable Tests", () => {
  test("reduceS", () => {
    expect(
      reduceS(
        (prev, current) => {
          const res = prev + current;
          return res > 5 ? stop(res) : res;
        },
        [1, 2, 3, 4]
      )
    ).toBe(6);
  });

  describe("goS, pipeS, stop, stopIf", () => {
    test("pipeS", () => {
      const f1 = pipeS(
        (a) => (a % 2 ? stop(a) : a),
        (a) => a + 10
      );

      expect(f1(1)).toBe(1);
      expect(f1(2)).toBe(12);
    });

    test("stopIf", () => {
      expect(
        goS({ a: 1, b: 2 }, stopIf({ a: 1 }), ({ a, b }) => ({
          a: a + 10,
          b,
        }))
      ).toStrictEqual({
        a: 1,
        b: 2,
      });
    });
  });
});
