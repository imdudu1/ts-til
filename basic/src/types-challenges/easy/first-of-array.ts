type First<T extends any[]> = T extends never[] ? never : T[0];

// First<[3, 2, 1]>
// First<[() => 123, { a: string }]>
// First<[]>
// First<[undefined]>
