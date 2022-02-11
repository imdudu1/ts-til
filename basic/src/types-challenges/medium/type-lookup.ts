type LookUp<U, T> =
    U extends { type: string }
        ? T extends U['type']
            ? U
            : never
        : never;
