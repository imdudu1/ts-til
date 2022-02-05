type MyPick<T, K extends keyof T> = { [entry in K]: T[entry] };

// MyPick<Todo, "title" | "completed">;

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
