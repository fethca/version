import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const levelIndex: Record<string, number> = { major: 0, minor: 1, patch: 2 }

export function bump(version: string, level: string): string {
  const index = levelIndex[level]
  return version
    .split('.')
    .map((part, i) => (i < index ? Number(part) : i === index ? Number(part) + 1 : 0))
    .join('.')
}

export function setVersion(version: string, dir = '.'): void {
  const path = join(dir, 'package.json')
  const content = readFileSync(path, 'utf8')
  writeFileSync(path, content.replace(/("version"\s*:\s*")[^"]*"/, `$1${version}"`))
}

export function getVersion(dir = '.'): string {
  return JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8')).version
}
