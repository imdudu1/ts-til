import { each, filter, go, gt } from "fxjs";

const solve = function (n, nums) {
  go(nums, filter(gt(n)), each(console.log));
};

solve(5, [1, 2, 3, 4, 5, 6, 10, 111]);
