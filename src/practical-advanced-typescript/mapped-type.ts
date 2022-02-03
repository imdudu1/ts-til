interface Pet {
  name: string;
  age: number;
}

type ReadonlyPet = { readonly [K in keyof Pet]: Pet[K] };
