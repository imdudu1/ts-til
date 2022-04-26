type MyCapitalize<S extends string> = S extends `${infer R}${infer P}` ? `${Uppercase<R>}${P}` : S
