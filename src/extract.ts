import { resolve } from 'path'

export async function extractVersion(): Promise<string> {
  const pjson = await import(resolve(process.cwd(), 'package.json'))
  return pjson.version
}
