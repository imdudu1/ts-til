type MyReadonly<T> = { readonly [K in keyof T]: T[K] };

// MyReadonly<Todo1>;

interface Todo1 {
  title: string;
  description: string;
  completed: boolean;
  meta: {
    author: string;
  };
}
