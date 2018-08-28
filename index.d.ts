declare module "@iarna/toml" {
  interface FuncParse {
    (toml: string): object
    async: (toml: string, options: { blocksize: number }) => Promise<object>
    stream: (readable: NodeJS.ReadableStream) => Promise<object>
  }

  export const parse: FuncParse
  export function stringify (obj: object): string
}
