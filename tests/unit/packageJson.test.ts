import { mkdtempSync, readFileSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { bump, setVersion } from '../../src/packageJson.js'

describe('bump', () => {
  it('should bump patch version', () => {
    expect(bump('1.2.3', 'patch')).toBe('1.2.4')
  })

  it('should bump minor version and reset patch', () => {
    expect(bump('1.2.3', 'minor')).toBe('1.3.0')
  })

  it('should bump major version and reset minor and patch', () => {
    expect(bump('1.2.3', 'major')).toBe('2.0.0')
  })
})

describe('setVersion', () => {
  function writePackageJson(content: string) {
    const dir = mkdtempSync(join(tmpdir(), 'version-'))
    writeFileSync(join(dir, 'package.json'), content)
    return dir
  }

  it('should only change the version and keep the file formatting', () => {
    const dir = writePackageJson(
      '{\r\n    "name": "app",\r\n    "version": "0.0.1",\r\n    "dependencies": { "x": "1.0.0" }\r\n}\r\n',
    )
    setVersion('0.0.2', dir)
    expect(readFileSync(join(dir, 'package.json'), 'utf8')).toBe(
      '{\r\n    "name": "app",\r\n    "version": "0.0.2",\r\n    "dependencies": { "x": "1.0.0" }\r\n}\r\n',
    )
  })
})
