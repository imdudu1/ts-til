type DeepReadonlyType<T> = { readonly [K in keyof T]: DeepReadonlyType<T[K]> };

interface Tag {
  name: string;
}

interface Address {
  address1: string;
  address2: string;
}

interface ReadonlyTodo {
  id: number;
  tags: Tag[];
  address: Address;
}

const todo: DeepReadonlyType<ReadonlyTodo> = {
  id: 0,
  address: {
    address1: "a",
    address2: "b",
  },
  tags: [{ name: "a" }],
};
