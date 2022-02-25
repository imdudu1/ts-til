import { Equal, Expect } from '../utils'

type Trim<S extends string> =
    S extends `${' '|'\t'|'\n'}${infer R}`
        ? Trim<R>
        : S extends `${infer L}${' '|'\t'|'\n'}`
            ? Trim<L>
            : S;

type cases = [
    Expect<Equal<Trim<'str'>, 'str'>>,
    Expect<Equal<Trim<' str'>, 'str'>>,
    Expect<Equal<Trim<'     str'>, 'str'>>,
    Expect<Equal<Trim<'str   '>, 'str'>>,
    Expect<Equal<Trim<'     str     '>, 'str'>>,
    Expect<Equal<Trim<'   \n\t foo bar \t'>, 'foo bar'>>,
]
