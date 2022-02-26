import { each, go, range } from "fxjs";

const fnSayHelloWorld = () => console.log("Hello World");

const solve = function (n) {
  go(range(n), each(fnSayHelloWorld));
};

solve(5);
