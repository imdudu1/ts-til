type If<C extends boolean, T, F> = C extends true ? T : F;

// If<true, 'a', 'b'>
// If<false, 'a', 2>
