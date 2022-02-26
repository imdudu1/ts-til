import { each, filter, go } from "fxjs";
import { zipWithIndex } from "fxjs/Lazy";
import { map } from "fxjs/es";

const solve = function (nums) {
  go(
    zipWithIndex(nums),
    filter(([i, _]) => i % 2),
    map(([_, v]) => v),
    each(console.log)
  );
};

solve([1, 2, 3, 4, 5, 6, 10, 111]);
