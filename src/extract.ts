import { readFileSync } from 'fs'
import { resolve } from 'path'

export async function extractVersion(): Promise<string> {
  const path = resolve(process.cwd(), 'package.json')
  const pckage = readFileSync(path, 'utf-8')
  const pjson = JSON.parse(pckage)
  return pjson.version
}
