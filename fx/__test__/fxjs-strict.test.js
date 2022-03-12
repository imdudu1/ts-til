import { add, append, baseSel, chunk, compact, countBy, deepFlat } from "fxjs";

describe("Strict Tests", function () {
  test("Add", function () {
    expect(add(10, 5)).toBe(15);
  });

  test("Append", function () {
    const list = [1, 2, 3, 4];
    const lastValue = 5;

    expect(append(lastValue, list)).toStrictEqual([1, 2, 3, 4, 5]);
  });

  test("BaseSel", function () {
    const jsonData = {
      a: {
        b: {
          c: 100,
        },
      },
    };

    const sel = baseSel("@");

    expect(sel("a@b@c", jsonData)).toBe(100);
    expect(sel("a@b@d", jsonData)).toBeUndefined();
  });

  test("Chunk", function () {
    const input = [1, 2, 3, 4, 5];

    const result = chunk(2, input);

    expect(result.length).toBe(3);
    expect(result[0]).toStrictEqual([1, 2]);
    expect(result[2]).toStrictEqual([5]);
  });

  test("Compact", function () {
    const result = compact([1, 2, 0, false, true, null, undefined]);

    expect(result).toStrictEqual([1, 2, true]);
  });

  test("countBy", function () {
    const args = [1, 2, 3, 4, 5];

    const result = countBy((v) => (v % 2 ? "odd" : "even"), args);

    expect(result["odd"]).toBe(3);
    expect(result["even"]).toBe(2);
  });

  test("deepFlat", function () {
    const args = [
      [[[[[[[[[1]]]]]]]]],
      [[[[[[[[[[[[[[[2]]]]]]]]]]]]]]],
      3,
      [4, 5],
      [[[[[[[[[[[[[[[6, 7, 8, 9, 10]]]]]]]]]]]]]]],
    ];

    const result = deepFlat(args);

    expect(result).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});
