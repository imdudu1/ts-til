type Concat<T extends unknown[], U extends unknown[]> = [...T, ...U];

// Concat<[], []>
// Concat<[], [1]>
// Concat<[1, 2], [3, 4]>
// Concat<['1', 2, '3'], [false, boolean, '4']>
