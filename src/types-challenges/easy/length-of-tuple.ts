type Length<T extends any> = T extends readonly unknown[] ? T["length"] : T;

const tesla = ["tesla", "model 3", "model X", "model Y"] as const;
const spaceX = [
  "FALCON 9",
  "FALCON HEAVY",
  "DRAGON",
  "STARSHIP",
  "HUMAN SPACEFLIGHT",
] as const;

// Length<typeof tesla>
// Length<typeof spaceX>
