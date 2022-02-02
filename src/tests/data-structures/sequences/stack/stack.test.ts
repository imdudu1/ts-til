import { Stack } from "../../../../data-structures/sequences/stack/stack";

describe("스택 테스트", () => {
  let stack: Stack<number>;

  beforeEach(() => {
    stack = new Stack();
  });

  it("push", () => {
    stack.push(10);
    stack.push(20);
    expect(stack.size()).toBe(2);
  });

  it("pop", () => {
    stack.push(10);
    stack.push(30);
    expect(stack.pop()).toBe(30);
    expect(stack.pop()).toBe(10);
    expect(() => stack.pop()).toThrowError();
  });
});
