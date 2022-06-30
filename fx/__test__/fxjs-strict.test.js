import {
  add,
  append,
  baseSel,
  blockUntilSettled,
  chunk,
  clone,
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
  dropWhile,
  each,
  entries,
  filterL,
  findWhere,
  flat,
  go,
  identity,
  isIterable,
  log,
  mapEntries,
  mapL,
  max,
  mean,
  meanBy,
  min,
  omit,
  omitBy,
  partition,
  pluck,
  prepend,
  range,
  rangeL,
  reduce,
  remove,
  repeat,
  sel,
  sum,
  takeAll,
  takeAllC,
  toIter,
  zip,
  extend,
  extendRight,
  filter,
  find,
  flatMap,
  fork,
  join,
  apply,
  juxt,
  constant,
  lt,
  gt,
  groupBy,
  head,
  includes,
  indexBy, initial, insert, intersection, intersectionBy
} from "fxjs";

describe("Strict Tests", function () {
  test("Add", function () {
    // given
    const addTen = add(10);

    // when
    const result = addTen(10);

    // then
    expect(result).toBe(20);
  });

  test("Append", function () {
    // given
    const list = [1, 2, 3, 4];
    const lastValue = 5;

    // when
    let actual = append(lastValue, list);

    // then
    expect(actual).toStrictEqual([1, 2, 3, 4, 5]);
  });

  test("BaseSel", function () {
    // given
    const jsonData = {
      a: {
        b: {
          c: 100,
        },
      },
    };
    const sel = baseSel("@");

    // when
    let actual1 = sel("a@b@c", jsonData);
    let actual2 = sel("a@b@d", jsonData);

    // then
    expect(actual1).toBe(100);
    expect(actual2).toBeUndefined();
  });

  test("blockUntilSettled", async function () {
    // given
    const result = 10;
    const millisecond = 100;
    const callApi = blockUntilSettled(_ => {
      return delay(millisecond, result);
    });

    // when
    const [r1, r2, r3] = await Promise.all([callApi(), callApi(), callApi()]);
    const r4 = await callApi();

    // then
    expect(r1).toBe(result);
    expect(r2).toBeUndefined();
    expect(r3).toBeUndefined();
    expect(r4).toBe(result);
  });

  test("Chunk", function () {
    // given
    const input = [1, 2, 3, 4, 5];

    // when
    const result = chunk(2, input);

    // then
    expect(result.length).toBe(3);
    expect(result[0]).toStrictEqual([1, 2]);
    expect(result[1]).toStrictEqual([3, 4]);
    expect(result[2]).toStrictEqual([5]);
  });

  test("clone", function () {
    // given
    const originalObj = {
      a: 10,
      b: {
        c: 20
      }
    }

    // when
    const cloneObj = clone(originalObj);
    cloneObj.b.c = 30;

    // then
    expect(originalObj.b.c).toBe(20);
    expect(cloneObj.b.c).toBe(30);
  });

  test("Compact", function () {
    // given
    const values = [1, 2, 0, false, true, null, undefined];

    // when
    const result = compact(values);

    // then
    expect(result).toStrictEqual([1, 2, true]);
  });

  test("countBy", function () {
    // given
    const args = [1, 2, 3, 4, 5];

    // when
    const result = countBy((v) => (v % 2 ? "odd" : "even"), args);

    // then
    expect(result["odd"]).toBe(3);
    expect(result["even"]).toBe(2);
  });

  test("deepFlat", function () {
    // given
    const args = [
      [[[[[[[[[1]]]]]]]]],
      [[[[[[[[[[[[[[[2]]]]]]]]]]]]]]],
      3,
      [4, 5],
      [[[[[[[[[[[[[[[6, 7, 8, 9, 10]]]]]]]]]]]]]]],
    ];

    // when
    const result = deepFlat(args);

    // then
    expect(result).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  test("findWhere", function () {
    expect(
      findWhere({age: 23}, [
        {name: "a", age: 15},
        {name: "b", age: 19},
        {name: "c", age: 23},
        {name: "d", age: 17},
        {name: "e", age: 23},
      ])
    ).toStrictEqual({name: "c", age: 23});
  });

  test("Defaults", function () {
    // given
    const input = {flavor: "chocolate"};
    const defaultValues = {flavor: "banana", sprinkles: "lots"};

    // when
    const result = defaults(input, defaultValues);

    // then
    expect(result.flavor).toBe("chocolate");
    expect(result.sprinkles).toBe("lots");
  });

  test("defaultTo", function () {
    const obj = {a: 1, c: null, d: undefined};

    expect(defaultTo(0, obj.a)).toBe(1);
    expect(defaultTo(0, obj.b)).toBe(0);
    expect(defaultTo(3, obj.c)).toBe(3);
    expect(defaultTo(2, obj.d)).toBe(2);
  });

  test("difference", function () {
    // given
    const right = [2, 3];
    const left = [2, 1, 2];

    // when
    let actual = difference(right, left);

    // then
    expect(actual).toStrictEqual([1]);
  });

  test('delay', async function () {
    // given
    const millisecond = 5000;
    const returnValue = 10;

    // when
    const result = delay(millisecond, returnValue);

    // then
    expect(result).toBe(returnValue);
  });

  test("differenceBy", function () {
    // given
    const comparator = (o) => o.age;
    const originalData = [
      {name: "andrew", age: 20},
      {name: "robbie", age: 20},
    ];
    const newDate = [
      {name: "andrew", age: 20},
      {name: "robbie", age: 21},
    ];
    const ageDiff = differenceBy(comparator, originalData);

    // when
    const [result] = ageDiff(newDate);

    // then
    expect(result.name).toBe("robbie");
    expect(result.age).toBe(21);
  });

  test("differenceWith", function () {
    // given
    const cmp = (left, right) => left.a === right.a;
    const data1 = [{a: 1}, {a: 2}, {a: 3}];
    const data2 = [{a: 1}, {a: 3}, {a: 4}];
    const diff = differenceWith(cmp, data1);

    // when
    let actual = diff(data2);

    // then
    expect(actual).toStrictEqual([{a: 2}]);
  });

  test("divide", function () {
    //  given
    const left = 4;
    const right = 2;

    // when
    const result = divide(left, right);

    // then
    expect(result).toBe(2);
  });

  test("drop", function () {
    // given
    const dropCount = 2;
    const input = [1, 2, 3, 4];

    // when
    const result = drop(dropCount, input);

    // then
    expect(result).toStrictEqual([3, 4]);
  });

  test("dropUntil", function () {
    // given
    const predication = v => v < 3;
    const input = [1, 2, 3, 4, 5, 6];

    // when
    let actual = dropUntil(predication, input);

    // then
    expect(actual).toStrictEqual([2, 3, 4, 5, 6]);
  });

  test("dropWhile", function () {
    // given
    const predication = v => v < 3;
    const input = [1, 2, 3, 4, 5, 6];

    // when
    let actual = dropWhile(predication, input);

    // then
    expect(actual).toStrictEqual([3, 4, 5, 6]);
  });

  test("each", function () {
    // given
    const values = [1, 2, 3, 4, 5, 6];

    // when
    const result = go(values, each(v => v + 10));

    // then
    expect(result).toStrictEqual(values);
  });

  test('entries', function () {
    const input = {
      a: 1,
      b: 2,
      c: 3,
    };

    const result = entries(input);

    expect(result[0]).toStrictEqual(['a', 1]);
    expect(result[1]).toStrictEqual(['b', 2]);
    expect(result[2]).toStrictEqual(['c', 3]);
  });

  test('extend', function () {
    // given
    const originalData = {flavor: "vanilla", sprinkles: "lots"};
    const extendData = {flavor: "chocolate", packaging: true};

    // when
    const result = extend(originalData, extendData);

    // then
    expect(result).toStrictEqual({
      flavor: "chocolate",
      sprinkles: "lots",
      packaging: true,
    });
  });

  test('extendRight', function () {
    // given
    const originalData = {flavor: "vanilla", sprinkles: "lots"};
    const extendData = {flavor: "chocolate", packaging: true};

    // when
    const result = extendRight(originalData, extendData);

    // then
    expect(result).toStrictEqual({
      flavor: "vanilla",
      sprinkles: "lots",
      packaging: true,
    });
  });

  test("dropRight", function () {
    // given
    const input = [1, 2, 3, 4];

    // when
    const result = dropRight(input)();

    // then
    expect(result).toStrictEqual([1, 2, 3]);
  });

  test('filter', function () {
    // given
    const even = v => v % 2 === 0;
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    // when
    const result = filter(even, input);

    // then
    expect(result).toStrictEqual([2, 4, 6, 8]);
  });

  test('find', function () {
    // given
    const where = ({age}) => 10 < age;
    const input = [
      {
        name: "Yohan",
        age: 28,
      },
      {
        name: "Doraemon",
        age: 5,
      }
    ];

    // when
    const result = find(where, input);

    // then
    expect(result.name).toBe("Yohan");
    expect(result.age).toBe(28);
  });

  test('findWhere', function () {
    // given
    const where = ({age}) => 10 < age;
    const input = [
      {
        name: "Yohan",
        age: 28,
      },
      {
        name: "Doraemon",
        age: 5,
      }
    ];

    // when
    const result = findWhere(where, input);

    // then
    expect(result.name).toBe("Yohan");
    expect(result.age).toBe(28);
  });

  test('flat', function () {
    // given
    const depth = 2;
    let iter = [[1, [2]], [[[3]]]];

    // when
    const result = flat(iter, depth);

    // then
    expect(result).toStrictEqual([1, 2, [3]]);
  });

  test('flatMap', function () {
    // given
    const twice = value => value * 2;
    const input = [1, [2], [[[[3]]]], [[4, 5]]];

    // when
    const result = flatMap(twice, input);

    // then
    expect(result).toStrictEqual([2, 4, 6, NaN]);
  });

  test('fork', function () {
    // given
    const input = [1, 2];
    const join = (left, right) => `${left}, ${right}`

    // when
    const result = fork(join, lt, gt, ...input);

    // then
    expect(result).toBe("true, false");
  });

  test('groupBy', function () {
    // given
    const grouping = ({name}) => name;
    const input = [
      {
        name: "Yohan",
        hobby: 'study',
      },
      {
        name: "Yohan",
        hobby: 'development',
      },
      {
        name: "Doraemon",
        hobby: 'drink',
      }
    ];

    // when
    const result = groupBy(grouping, input);

    // then
    expect(result['Yohan']).toHaveLength(2);
    expect(result['Doraemon']).toHaveLength(1);
  });

  test('head', function () {
    // given
    const input = [1, 2, 3, 4, 5];

    // when
    const result = head(input);

    // then
    expect(result).toBe(1);
    expect(input).toStrictEqual([1, 2, 3, 4, 5]);
  });

  test('identity', function () {
    // given
    const input = 1;

    // when
    const result = identity(input);

    // then
    expect(result).toBe(input);
  });

  test('includes', function () {
    // given
    const requiredValue = 10;
    const values = [1, 2, 3, 4, 5, 6, 10];
    const mustIncludeTen = includes(requiredValue);

    // when
    const result = mustIncludeTen(values);

    // then
    expect(result).toBe(true);
  });

  test('indexBy', function () {
    // given
    const selector = ({id}) => id;
    const values = [
      {
        id: 1,
        name: "Yohan"
      },
      {
        id: 2,
        name: "Doraemon"
      }
    ];

    // when
    const result = indexBy(selector, values);

    // then
    expect(result[1].name).toBe("Yohan");
    expect(result[2].name).toBe("Doraemon");
  });

  test('initial', function () {
    // given
    const values = [1, 2, 3, 4, 5];

    // when
    const result = initial(values);

    // then
    expect(result).toStrictEqual([1, 2, 3, 4]);
  });

  test('insert', function () {
    // given
    const values = [1, 2, 3, 4, 5, 6];

    // when
    const result = insert(0, 999, values);

    // then
    expect(result).toStrictEqual([999, 1, 2, 3, 4, 5, 6]);
  });

  test('intersection', function () {
    // given
    const left = [{
      name: "Yohan",
      age: 28,
    }, {
      name: "Doraemon",
      age: 5,
    }];
    const right = [{
      name: "Yohan",
      age: 8,
    }, {
      name: "Shin Nohara",
      age: 6,
    }];
    const selector = ({name}) => name;

    // when
    const result = intersectionBy(selector, left, right);

    // then
    expect(result).toStrictEqual([{
      name: "Yohan",
      age: 8,
    }]);
  });

  test("mapEntries", function () {
    expect(mapEntries((v) => v + 10, entries({a: 1, b: 2}))).toStrictEqual([
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
    expect(meanBy(sel("age"), [{age: 10}, {age: 20}])).toBe(15);
  });

  test("min", function () {
    expect(min([10, 1000, 3, 1, 3, 4, 5])).toBe(1);
  });

  test("omit", function () {
    expect(omit(["a", "c"], {a: 1, b: 2, c: 3, d: 4})).toStrictEqual({
      b: 2,
      d: 4,
    });
  });

  test("omitBy", function () {
    expect(
      omitBy(([_, v]) => v % 2 === 0, {a: 1, b: 2, c: 3, d: 4})
    ).toStrictEqual({a: 1, c: 3});
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

  test("pluck", function () {
    const input = [{id: 1}, {id: 2}];
    expect(pluck("id", input)).toStrictEqual([1, 2]);
  });

  test("prepend", function () {
    expect(prepend(1, [2, 3])).toStrictEqual([1, 2, 3]);
  });

  test("toIter", function () {
    expect(go(toIter([1, 2]), isIterable)).toBeTruthy();
  });

  test("remove", function () {
    expect(remove(0, [1, 2, 3, 4, 5])).toStrictEqual([2, 3, 4, 5]);
  });

  test("repeat", function () {
    const add = (a, b) => a + b;
    expect(go(repeat(1, 10), reduce(add))).toBe(10);
  });

  test("zip", function () {
    zip();
  });

  test("extend", function () {
    expect(
      extend({flavor: "vanilla", sprinkles: "lots"}, {flavor: "chocolate"})
    ).toStrictEqual({flavor: "chocolate", sprinkles: "lots"});
  });

  test('Clojure Reducers', function () {
    go(
      rangeL(1, 10),
      mapL((v) => {
        line: v * 10
      }),
      filterL((page) => page.line > 50),
      mapL(({line}) => line),
      takeAllC(2),
      flat,
      countBy(identity),
      log
    );
  });
});
