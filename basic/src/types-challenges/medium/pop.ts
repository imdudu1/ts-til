type Pop<T extends any[]> = T extends [...infer R, infer U] ? R : never;

/* _____________ Test Cases _____________ */
import { Expect, Equal } from "../utils";

type cases = [
  Expect<Equal<Pop<[3, 2, 1]>, [3, 2]>>,
  Expect<Equal<Pop<['a', 'b', 'c', 'd', ]>, ['a', 'b', 'c']>>,
]
