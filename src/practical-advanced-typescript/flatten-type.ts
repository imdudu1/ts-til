const numbers = ["a", 1];
const obj = {
  id: 21,
  name: "Byeongju, Shin",
};
const bool = true;

type FlattenArray<T extends any[]> = T[number];
type FlattenObject<T extends object> = T[keyof T];

type NumbersArrayFlattened = FlattenArray<typeof numbers>;
type ObjectFlattened = FlattenObject<typeof obj>;

type Flatten<T> = T extends any[]
  ? T[number]
  : T extends object
  ? T[keyof T]
  : T;
