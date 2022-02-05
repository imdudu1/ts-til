type TupleToObject<T extends readonly any[]> = { [P in T[number]]: P };

const tuple = ["tesla", "model 3", "model X", "model Y"] as const;

// TupleToObject<typeof tuple>;
