import { resolve } from 'path'
import { extractVersion } from '../src/extract.js'

describe('extractVersion', () => {
  it('should return package.json version', async () => {
    vi.doMock(resolve(process.cwd(), 'package.json'), () => ({ version: '1.0.0' }))
    const result = await extractVersion()
    expect(result).toBe('1.0.0')
  })
})
