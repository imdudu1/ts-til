import {
  add,
  append,
  baseSel,
  chunk,
  compact,
  countBy,
  deepFlat,
  defaults,
  defaultTo,
  delay,
  difference,
  differenceBy,
  differenceWith,
  divide,
  drop,
  dropRight,
  dropUntil,
  entries,
  go,
  identity, isIterable,
  mapEntries,
  max,
  mean,
  meanBy,
  min,
  omit,
  omitBy,
  partition, pluck, prepend,
  range,
  reduce,
  remove,
  repeat,
  sel, sum, toIter, zip,
} from "fxjs";

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

  test("Defaults", function () {
    const input = { flavor: "chocolate" };
    const defaultV = { flavor: "banana", sprinkles: "lots" };

    const result = defaults(input, defaultV);

    expect(result.flavor).toBe("chocolate");
    expect(result.sprinkles).toBe("lots");
  });

  test("defaultTo", function () {
    const obj = { a: 1, c: null, d: undefined };

    expect(defaultTo(0, obj.a)).toBe(1);
    expect(defaultTo(0, obj.b)).toBe(0);
    expect(defaultTo(3, obj.c)).toBe(3);
    expect(defaultTo(2, obj.d)).toBe(2);
  });

  test("difference", function () {
    const l = [2, 3];
    const r = [2, 1, 2];

    expect(difference(l, r)).toStrictEqual([1]);
  });

  test("differenceBy", function () {
    const fn = (o) => o.age;
    const data = [
      { name: "andrew", age: 20 },
      { name: "robbie", age: 20 },
    ];
    const oldData = [
      { name: "andrew", age: 20 },
      { name: "anna", age: 21 },
    ];

    const [result] = differenceBy(fn, data, oldData);

    expect(result.name).toBe("anna");
  });

  test("differenceWith", function () {
    const cmp = (x, y) => x.a === y.a;
    const l1 = [{ a: 1 }, { a: 2 }, { a: 3 }];
    const l2 = [{ a: 1 }, { a: 3 }];

    expect(differenceWith(cmp, l1, l2)).toStrictEqual([{ a: 2 }]);
  });

  test("divide", function () {
    expect(divide(4, 2)).toBe(2);
  });

  test("drop", function () {
    expect(drop(1, drop(1, [1, 2, 3, 4]))).toStrictEqual([3, 4]);
  });

  test("dropUntil", function () {
    expect(dropUntil((v) => 1 < v, [1, 2, 3, 4, 5])).toStrictEqual([3, 4, 5]);
  });

  test("mapEntries", function () {
    expect(mapEntries((v) => v + 10, entries({ a: 1, b: 2 }))).toStrictEqual([
      ["a", 11],
      ["b", 12],
    ]);
  });

  test("max", function () {
    expect(max([1, 3, 7, 4, 2])).toBe(7);
  });

  test("mean", function () {
    expect(mean([1, 2, 3, 4, 5, 6])).toBe(3.5);
  });

  test("meanBy", function () {
    expect(meanBy(identity, [1, 2, 3, 4, 5, 6])).toBe(3.5);
    expect(meanBy(sel("age"), [{ age: 10 }, { age: 20 }])).toBe(15);
  });

  test("min", function () {
    expect(min([10, 1000, 3, 1, 3, 4, 5])).toBe(1);
  });

  test("omit", function () {
    expect(omit(["a", "c"], { a: 1, b: 2, c: 3, d: 4 })).toStrictEqual({
      b: 2,
      d: 4,
    });
  });

  test("omitBy", function () {
    expect(
      omitBy(([_, v]) => v % 2 === 0, { a: 1, b: 2, c: 3, d: 4 })
    ).toStrictEqual({ a: 1, c: 3 });
  });

  test("partition", function () {
    const p = partition((v) => v % 2, [1, 2, 3, 4, 5]);
    expect(p[0]).toStrictEqual([1, 3, 5]);
    expect(p[1]).toStrictEqual([2, 4]);
  });

  test("range", function () {
    expect(range(0, 20, 5)).toStrictEqual([0, 5, 10, 15]);
  });

  test("reduce", function () {
    const add = (a, b) => a + b;
    expect(reduce(add, [1, 2, 3, 4])).toBe(10);
  });

  test('pluck', function () {
    const input = [{id: 1}, {id: 2}];
    expect(pluck('id', input)).toStrictEqual([1,2]);
  });

  test('prepend', function () {
    expect(prepend(1, [2,3])).toStrictEqual([1,2,3]);
  });

  test('toIter', function () {
    expect(go(toIter([1,2]), isIterable)).toBeTruthy();
  });

  test("remove", function () {
    expect(remove(0, [1, 2, 3, 4, 5])).toStrictEqual([2, 3, 4, 5]);
  });

  test("repeat", function () {
    const add = (a, b) => a + b;
    expect(go(repeat(1, 10), reduce(add))).toBe(10);
  });

  test('zip', function () {
    zip();
  })
});
