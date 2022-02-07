const curry = func => {
  return (a, ..._) => {
    if (_.length) {
      return func(a, ..._);
    }
    return (..._) => func(a, ..._);
  }
}

const take = curry((l, iter) => {
  let res = [];
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    res.push(cur.value);
    if (res.length === l) return res;
  }
  return res;
});

const reduce = curry((func, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const elem of iter) {
    acc = func(acc, elem);
  }
  return acc;
});

const takeAll = take(Infinity);

const go = (...args) => reduce((v, func) => func(v), args);

const pipe = (func, ...othersFunc) => (...args) => go(func(...args), ...othersFunc);

const L = {};

L.range = function* (l) {
  let i = 0;
  while (i++ < l) {
      yield i;
  }
};

L.map = curry(function* (func, iter) {
  for (const elem of iter) {
    yield func(elem);
  }
});

L.filter = curry(function* (func, iter) {
  for (const elem of iter) {
    if (func(elem)) {
      yield elem;
    }
  }
});

L.entries = function* (obj) {
  for (const k in obj) {
    yield [k, obj[k]];
  }
}

L.flatten = function* (iter) {
  for (const elem of iter) {
    if (elem && elem[Symbol.iterator]) {
      for (const inner of elem) {
        yield inner;
      }
      continue;
    }
    yield elem;
  }
}

const map = curry(pipe(L.map, takeAll));

const filter = curry(pipe(L.filter, takeAll));

// Example (1)
const products = [
  {name: 'ram', price: 130000},
  {name: 'cpu', price: 1300000},
  {name: 'gpu', price: 13000000},
  {name: 'monitor', price: 1300000},
]
go(
  products, 
  L.filter((product) => 130000 < product.price), 
  L.map((product) => product.price), 
  reduce((a,b)=>a+b),
  console.log);

// Example (2)
const join = curry((sep = ', ', iter) => reduce((prev, cur) => `${prev}${sep}${cur}`, iter));
console.log(join()([1,23,4]))

// Example (3)
const flattenArray = [[1, 2], 3, 4, [5, 6, 7, 8], 9];
console.log(...L.flatten(flattenArray))
