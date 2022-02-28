import { go, sum, filter } from "fxjs";

const solver = (l) => go(l, filter((v) => v % 2), sum); 

const input = [1, 2, 3, 5];
console.log(solver(input));
