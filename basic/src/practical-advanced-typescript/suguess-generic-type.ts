type CReturnType<F> = F extends (...args: any[]) => infer R ? R : any;

function genId(seed: number) {
  return seed + "5";
}

type ID = CReturnType<typeof genId>;

function lookUpEntity(id: ID) {}

type UnpackPromiseArray<P> = P extends Promise<infer K>[] ? K : any;

const promises = [
  Promise.resolve(true),
  Promise.resolve("test"),
  Promise.resolve(1),
];

type ExpectedPromiseTypes = UnpackPromiseArray<typeof promises>;

function doAll(p: ExpectedPromiseTypes) {}
