declare module "@iarna/toml" {
  type AnyJson = boolean | number | string | null | JsonArray | JsonMap
  interface JsonArray extends Array<AnyJson> {}
  interface JsonMap {
    [key: string]: AnyJson;
  }
  
  interface FuncParse {
    (toml: string): JsonMap
    async: (toml: string, options: { blocksize: number }) => Promise<JsonMap>
    stream: (readable: NodeJS.ReadableStream) => Promise<JsonMap>
  }

  export const parse: FuncParse
  export function stringify (obj: JsonMap): string
}
