import LinkedListNode from "./linked-list-node";

export interface List<T> {
  get(index: number): T;
  size(): number;
}

export interface MutableList<T> extends List<T> {
  pushBack(value: T): void;
  pushFront(value: T): void;
  popBack(): T;
  popFront(): T;
}

export class LinkedList<T> implements MutableList<T> {
  private head: LinkedListNode<T>;
  private tail: LinkedListNode<T>;

  private constructor() {}

  static list<T>(): List<T> {
    return new LinkedList<T>();
  }

  static mutableList<T>(): MutableList<T> {
    return new LinkedList<T>();
  }

  private init(value: T) {
    this.head = new LinkedListNode<T>(value);
    this.tail = this.head;
  }

  pushFront(value: T): void {
    if (!this.head) {
      this.init(value);
      return;
    }
    const newNode = new LinkedListNode<T>(value);
    this.head.prev = newNode;
    newNode.next = this.head;
    this.head = newNode;
  }

  pushBack(value: T): void {
    if (!this.head) {
      this.init(value);
      return;
    }
    const newNode = new LinkedListNode<T>(value);
    this.tail.next = newNode;
    newNode.prev = this.tail;
    this.tail = newNode;
  }

  popBack(): T {
    if (!this.head) {
      throw new Error("Empty list");
    }
    const result = this.tail.val;
    this.tail.prev.next = null;
    this.tail = this.tail.prev;
    return result;
  }

  popFront(): T {
    if (!this.head) {
      throw new Error("Empty list");
    }
    const result = this.head.val;
    this.head.next.prev = null;
    this.head = this.head.next;
    return result;
  }

  get(index: number): T {
    if (!this.head) {
      throw new Error("Empty list");
    }
    let p = index;
    let cur = this.head;
    while (p-- && cur.next) {
      cur = cur.next;
    }
    return cur.val;
  }

  size(): number {
    if (!this.head) {
      return 0;
    }
    let size = 0;
    let cur = this.head;
    while (cur != null) {
      cur = cur.next;
      size++;
    }
    return size;
  }
}
