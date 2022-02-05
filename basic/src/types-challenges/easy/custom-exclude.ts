type MyExclude<T, U> = T extends U ? never : T;

// MyExclude<"a" | "b" | "c", "a">
// MyExclude<"a" | "b" | "c", "a" | "b">
// MyExclude<string | number | (() => void), Function>
