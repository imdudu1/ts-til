import { curry, go } from "fxjs";
import { map } from "fxjs/es";

const fact = (v) => (v <= 1 ? 1 : v * fact(v - 1));

const calc = (n, v) =>
  n === 0 ? 1 : Math.pow(v, n) / fact(v) + calc(v, n - 1);

const solver = (l, n) => {
  const calcN = curry(calc)(n);
  return go(l, map(calcN));
};

console.log(solver([20.0, 5.0, 0.5, -0.5], 9));
