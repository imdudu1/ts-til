namespace SelfRefType {
  interface Action {
    type: string;
  }

  interface ListNode<T> {
    value: T;
    prev: ListNode<T> | null;
    next: ListNode<T> | null;
  }

  let action1 = { type: "LOGIN" };
  let action2 = { type: "LOAD_POSTS" };

  let node1: ListNode<Action> = {
    value: action1,
    prev: null,
    next: null,
  };
}
