interface Todo {
  todos: string[];
}

enum TodoActionType {
  ADD = "add",
  REMOVE_ALL = "remove_all",
  REMOVE_ONE = "remove_one",
}

interface Action {
  tag: TodoActionType;
}

class Add implements Action {
  readonly tag = TodoActionType.ADD;
  constructor(public readonly content: string) {}
}

class RemoveAll implements Action {
  readonly tag = TodoActionType.REMOVE_ALL;
}

class RemoveOne implements Action {
  readonly tag = TodoActionType.REMOVE_ONE;
  constructor(public readonly id: number) {}
}

type TodoActions = Add | RemoveAll | RemoveOne;

function execute(action: TodoActions) {
  switch (action.tag) {
    case TodoActionType.ADD: {
      // Add class
      console.log(action.content);
      break;
    }
    case TodoActionType.REMOVE_ALL: {
      // RemoveAll class
      break;
    }
    case TodoActionType.REMOVE_ONE: {
      // RemoveOne class
      console.log(action.id);
      break;
    }
  }
}
