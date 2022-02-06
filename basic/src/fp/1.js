const curry = func => {
  return (a, ..._) => {
    if (_.length) {
      return func(a, ..._);
    }
    return (..._) => func(a, ..._);
  }
}

const take = (l, iter) => {
  let res = [];
  for (const e of iter) {
    res.push(e);
    if (res.length == l) return res;
  }
  return res;
}

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

const go = (...args) => reduce((v, func) => func(v), args);

const pipe = (func, ...otherFuncs) => (...args) => go(func(...args), ...otherFuncs);

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
