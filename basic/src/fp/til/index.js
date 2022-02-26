import {C, F, L} from "./utils.mjs";

// Example (1)
const products = [
    {name: 'ram', price: 130000},
    {name: 'cpu', price: 1300000},
    {name: 'gpu', price: 13000000},
    {name: 'monitor', price: 1300000},
]
F.go(
    products,
    L.filter((product) => 130000 < product.price),
    L.map((product) => product.price),
    F.reduce((a, b) => a + b),
    F.log('Total price >> '));

// Example (2)
const join = F.curry((sep = ', ', iter) => F.reduce((prev, cur) => `${prev}${sep}${cur}`, iter));
F.log('Join example >> ')(join('-')([1, 23, 4]));

// Example (3)
F.log('Flatten example >> ')([...L.flatten([[1, 2], 3, 4, [5, 6, 7, 8], 9])]);

// Example (4)
F.log('FlatMap example >> ')([...L.flatMap(F.map(v => v * v), [[1, 2], [3], [4, 5, 6, 7], [8]])]);

// Example (5)
F.go(
    Promise.resolve(1),
    a => a + 10,
    a => Promise.resolve(a * 100),
    a => Promise.resolve(a + 5),
    a => a + 123,
    a => a + 456,
    F.log('Promise value >> '));

// Example (6)
F.go(
    [Promise.resolve(1), Promise.resolve(2)],
    L.map(a => a * 10),
    F.take(2),
    F.log('Promise array >> ')
)

// Example (7)
F.go(
    [1, 2, 3, 4, 5, 6, 7],
    L.map(a => Promise.resolve(a * a)),
    L.filter(a => a % 2),
    F.take(10),
    F.log('Promise filter example >> ')
)

// Example (8)
F.go(
    [1, 2, 3, 4, 5],
    L.map(a => Promise.resolve(a * a)),
    L.filter(a => Promise.resolve(a % 2)),
    F.reduce((a, b) => a + b),
    F.log('Promise reduce example >> ')
)

// Example (9)
const delay1000 = a => new Promise(resolve => {
    setTimeout(() => resolve(a), 1000);
});
F.go(
    L.range(100),
    L.map(a => delay1000(a * a)),
    L.filter(a => a % 2),
    C.take(2),
    C.reduce((a, b) => a + b),
    F.log('Concurrent reduce example >> ')
)

// Example (10)
C.map(a => delay1000(a * a), [1, 2, 3, 4, 5, 6, 7]).then(F.log('Concurrent map example >> '));
C.filter(a => delay1000(a % 2), [1, 2, 3, 4, 5, 6, 7]).then(F.log('Concurrent filter example >> '));

// Example (11)
const split = F.curry((sep, s) => s.split(sep));
const queryToObject = F.pipe(
  split('&'),
  L.map(split('=')),
  L.map(([k, v]) => ({ [k]: v })),
  F.reduce(Object.assign));
console.log(queryToObject('a=1&c=CC&d=Dd'));

// Example (12)
const f = x => x + 10;
const g = x => x - 5;
const fg = x => f(g(x));

F.go(
  [],
  L.map(fg));

// Example (13)
const users = [{ name: 'aa' }, { name: 'bb' }];
const findUser = F.take(1, L.filter(u => u.name === 'bb', users));
console.log(findUser);

// Example (14)
const obj = {
  a: 1,
  b: 2,
  c: 3
};

console.log('Object.values >> ', Object.values(obj));

console.log('L.values >> ', [...L.values(obj)]);

// Example (15)
console.log([...L.entries(obj)]);

// Example (16)
const a = [['a', 1], ['b', 2], ['c', 3], ['d', 4]];
console.log('object >> ', F.object(a));

// Example (17)
const object2 = entries => F.reduce((obj, [k,v]) => (obj[k] = v, obj),  {}, entries)

console.log('object2 >> ', object2(L.entries({b:2, c:3})));

// Example (18)
console.log(F.mapObject(a => a + 10, {a:1, b:2, c:3}));

// Example (19)
console.log('pick >> ', F.pick(['a', 'b', 'z'], F.object(a)));

// Example (20)
const data = [
    {id: 1, name: 'happy', age: 1000},
    {id: 20, name: 'birth', age: 1010},
    {id: 15, name: 'day', age: 1300},
    {id: 9, name: 'to', age: 1050},
    {id: 4, name: 'you', age: 1090},
];
console.log('indexBy', F.indexBy((v) => v.id, data));
