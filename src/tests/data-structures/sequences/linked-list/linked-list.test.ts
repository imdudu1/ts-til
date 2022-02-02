import {
  LinkedList,
  MutableList,
} from "../../../../data-structures/sequences/linked-list";

describe("Linked list 테스트", () => {
  let linkedlist: MutableList<number>;

  beforeEach(() => {
    linkedlist = LinkedList.mutableList();
  });

  it("빈 linked list", () => {
    expect(linkedlist.size()).toBe(0);
  });

  it("빈 linked list에서 pop하면 예외가 발생한다.", () => {
    expect(() => linkedlist.popBack()).toThrowError();
    expect(() => linkedlist.popFront()).toThrowError();
  });

  it("삽입(push)", () => {
    linkedlist.pushBack(10);
    linkedlist.pushBack(20);
    linkedlist.pushBack(30);
    linkedlist.pushBack(40);
    expect(linkedlist.size()).toBe(4);

    expect(linkedlist.get(0)).toBe(10);
    expect(linkedlist.get(3)).toBe(40);
  });

  it("제거(pop)", () => {
    linkedlist.pushBack(10);
    linkedlist.pushBack(20);
    linkedlist.pushBack(30);
    linkedlist.pushBack(40);

    expect(linkedlist.popFront()).toBe(10);
    expect(linkedlist.popBack()).toBe(40);
    expect(linkedlist.size()).toBe(2);
  });
});
