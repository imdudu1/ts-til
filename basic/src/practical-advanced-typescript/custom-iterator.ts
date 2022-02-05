class BackwardActionIterator implements IterableIterator<TodoActionType> {
  [Symbol.iterator](): IterableIterator<TodoActionType> {
    return this;
  }

  next(): IteratorResult<TodoActionType> {
    return { value: 0, done: true };
  }
}

interface ListNode<T> {
  value: T;
  prev: ListNode<T>;
  next: ListNode<T>;
}
