import { go } from "fxjs";
import { map } from "fxjs/es";

const solver = function (list) {
  return go(
    list,
    map((v) => Math.abs(v))
  );
};

console.log(solver([2, 4, 3, -3, 1, 4, -10, -11]));
