declare module 'stringify-object' {
  function stringifyObject(o: any, options?: Partial<{
    indent: string,
    singleQuotes: boolean,
    filter: (o: any, prop: string) => boolean,
    inlineCharacterLimit: number
  }>): string

  namespace stringifyObject { }
  export = stringifyObject
}
