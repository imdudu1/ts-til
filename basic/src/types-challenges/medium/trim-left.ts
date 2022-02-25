import { Equal, Expect } from '../utils'

type TrimLeft<S extends string> =
    S extends `${infer c}${infer rest}`
        ? c extends (' '|'\n'|'\t')
            ? TrimLeft<rest>
            : S
        : S;

type cases = [
    Expect<Equal<TrimLeft<'str'>, 'str'>>,
    Expect<Equal<TrimLeft<' str'>, 'str'>>,
    Expect<Equal<TrimLeft<'     str'>, 'str'>>,
    Expect<Equal<TrimLeft<'     str     '>, 'str     '>>,
    Expect<Equal<TrimLeft<'   \n\t foo bar '>, 'foo bar '>>,
]
