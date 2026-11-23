import { readFileSync } from 'fs'
import { parse } from '../..'

const text = 'title = "café"'
const buffer = Buffer.from(text, 'utf8')
const file = readFileSync('config.toml')

const fromString = parse(text)
const fromBuffer: typeof fromString = parse(buffer)
const fromFile: typeof fromString = parse(file)

interface Config {
  title: string
}

const stringConfig: Config = parse<Config>(text)
const bufferConfig: Config = parse<Config>(buffer)
const fileConfig: Config = parse<Config>(file)
const asyncConfig: Promise<Config> = parse.async<Config>(text)

// @ts-expect-error The default return type is an object, not a number.
const numberResult: number = fromBuffer
// @ts-expect-error Explicit generic returns retain their declared properties.
const numberTitle: number = parse<Config>(buffer).title
// @ts-expect-error Numbers are not TOML text.
parse(123)
// @ts-expect-error Only Buffers, not arbitrary byte arrays, are decoded.
parse(new Uint8Array([97, 61, 49]))
// @ts-expect-error The asynchronous parser still requires a string.
parse.async(buffer)
