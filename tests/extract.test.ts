import { readFileSync } from 'fs'
import { extractVersion } from '../src/extract.js'

vi.mock('fs')

describe('extractVersion', () => {
  beforeEach(() => {
    vi.mocked(readFileSync).mockReturnValue(JSON.stringify({ version: '1.0.0' }))
  })

  it('should return package.json version', async () => {
    const result = await extractVersion()
    expect(result).toBe('1.0.0')
  })
})
