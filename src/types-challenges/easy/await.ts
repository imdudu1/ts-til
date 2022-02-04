type MyAwaited<T> = T extends Promise<infer R>
  ? R extends Promise<any>
    ? MyAwaited<R>
    : R
  : T;

// type X = Promise<string>;
// type Y = Promise<{ field: number }>;
// type Z = Promise<Promise<string | number>>;

// MyAwaited<X>
// MyAwaited<Y>
// MyAwaited<Z>
