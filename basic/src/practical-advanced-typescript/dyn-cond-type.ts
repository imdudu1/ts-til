interface StringContainer {
  value: string;
  format(): string;
  split(): string[];
}

interface NumberContainer {
  value: number;
  nearestPrime: number;
  round(): number;
}

interface Item<T> {
  id: T;
  container: T extends string ? StringContainer : NumberContainer;
}

let item: Item<string> = {
  id: "a23",
  container: {
    value: "string container",
    format(): string {
      return "";
    },
    split(): string[] {
      return this.value.split(" ");
    },
  },
};

item.container.split(); // StringContainer로 추론

let item2: Item<number> = {
  container: {
    value: 10,
    nearestPrime: 10,
    round(): number {
      return 0;
    },
  },
  id: 123,
};

item2.container.round(); // NumberContainer로 추론

type ArrayOnly<T> = T extends any[] ? T : never;
type StringOrNumber = ArrayOnly<string | number | string[] | number[]>; // string[] | number[]

interface Book {
  id: string;
}

interface TV {
  id: number;
}

interface ItemService {
  getItem<T extends string | number>(id: T): T extends string ? Book : TV;
}
