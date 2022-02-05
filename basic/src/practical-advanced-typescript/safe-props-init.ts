class Library {
  titles: string[];
  tags!: string[];

  constructor(titles: string[]) {
    this.titles = titles;
  }
}

const library = new Library(["a", "b", "c"]);

/*
// tsconfig.json
{
  "compilerOptions": {
    "strictPropertyInitialization": true,
    "strictNullChecks": true
  }
}
*/
