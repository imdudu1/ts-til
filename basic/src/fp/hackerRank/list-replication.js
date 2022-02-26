import { go, map, repeat } from "fxjs/es";
import { curry, flat } from "fxjs";

const solve = function (times, nums) {
  const repeatNum = curry((times, num) => repeat(num, times))(times);
  go(nums, map(repeatNum), flat, console.log);
};

solve(3, [1, 2, 3, 4, 5]);
