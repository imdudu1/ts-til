import { LinkedList, MutableList } from "../linked-list";

export class Stack<T> {
  private linkedList: MutableList<T>;

  constructor() {
    this.linkedList = LinkedList.mutableList();
  }

  push(value: T) {
    this.linkedList.pushBack(value);
  }

  pop(): T {
    return this.linkedList.popBack();
  }

  size(): number {
    return this.linkedList.size();
  }
}
