const F = {};
const L = {};

F.curry = func => {
    return (a, ..._) => {
        if (_.length) {
            return func(a, ..._);
        }
        return (..._) => func(a, ..._);
    }
};

F.take = F.curry((l, iter) => {
    let res = [];
    iter = iter[Symbol.iterator]();
    return function recur() {
        let cur;
        while (!(cur = iter.next()).done) {
            const a = cur.value;
            if (a instanceof Promise) {
                return a
                    .then(a => (res.push(a), res).length === l ? res : recur())
                    .catch(e => e === NOP ? recur() : Promise.reject(e));
            }
            res.push(a);
            if (res.length === l) return res;
        }
        return res;
    }();
});

F._go = (v, func) => v instanceof Promise ? v.then(func) : func(v);

const head = iter => F._go(F.take(1, iter), ([h]) => h);

const reduceF = (acc, a, f) =>
    a instanceof Promise
        ? a.then(a => f(acc, a), e => e === NOP ? acc : Promise.reject(e))
        : f(acc, a);

F.reduce = F.curry((f, acc, iter) => {
    if (!iter) return F.reduce(f, head(iter = acc[Symbol.iterator]()), iter);

    iter = iter[Symbol.iterator]();
    return F._go(acc, function recur(acc) {
        let cur;
        while (!(cur = iter.next()).done) {
            acc = reduceF(acc, cur.value, f);
            if (acc instanceof Promise) return acc.then(recur);
        }
        return acc;
    });
});

const takeAll = F.take(Infinity);

F.go = (...args) => F.reduce((v, func) => func(v), args);

F.pipe = (func, ...othersFunc) => (...args) => F.go(func(...args), ...othersFunc);

const isIterable = obj => obj && obj[Symbol.iterator];

L.range = function* (l) {
    let i = 0;
    while (i++ < l) {
        yield i;
    }
};

L.map = F.curry(function* (f, iter) {
    for (const v of iter) {
        yield F._go(v, f);
    }
});

const NOP = Symbol('nop');

L.filter = F.curry(function* (f, iter) {
    for (const v of iter) {
        const b = F._go(v, f);
        if (b instanceof Promise) yield b.then(result => {
            if (result) {
                return v;
            }
            return Promise.reject(NOP);
        })
        else if (b) yield v;
    }
});

L.entries = function* (obj) {
    for (const k in obj) {
        yield [k, obj[k]];
    }
};

L.flatten = function* (iter) {
    for (const elem of iter) {
        if (isIterable(elem)) {
            yield* elem;
            continue;
        }
        yield elem;
    }
};

L.deepFlat = function* f(iter) {
    for (const elem of iter) {
        if (isIterable(elem)) {
            yield* f(elem);
            continue;
        }
        yield elem;
    }
};

L.flatMap = F.curry(F.pipe(L.map, L.flatten));

F.map = F.curry(F.pipe(L.map, takeAll));

F.filter = F.curry(F.pipe(L.filter, takeAll));

F.flatten = F.pipe(L.flatten, takeAll);

F.flatMap = F.curry(F.pipe(L.map, F.flatten));

F.log = F.curry((prefix = '[LOG]', iter) => console.log(prefix, iter));

export {
    F, L
}
