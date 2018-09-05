declare module "@iarna/toml" {
  type AnyJson = boolean | number | string | null | JsonArray | JsonMap
  interface JsonArray extends Array<AnyJson> {}
  interface JsonMap {
    [key: string]: AnyJson;
  }
  
  interface FuncParse {
    (toml: string): JsonMap
    async: (toml: string, options: { blocksize: number }) => Promise<object>
    stream: (readable: NodeJS.ReadableStream) => Promise<object>
  }

  export const parse: FuncParse
  export function stringify (obj: JsonMap): string
}
