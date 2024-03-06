import { createInterface } from 'readline'
import { extractVersion } from '../src/extract.js'
import { git } from '../src/git.js'
import { logInfo } from '../src/logger.js'
import { confirmRelease, release } from '../src/release.js'

vi.mock('readline')
vi.mock('../src/exit')
vi.mock('../src/extract')
vi.mock('../src/git')
vi.mock('../src/logger')

function mockReadLine(answer?: string) {
  const question = vi.fn().mockImplementation((_, cb) => cb(answer))
  vi.mocked(createInterface).mockReturnValue({ question, close: vi.fn() } as never)
}

describe('confirmRelease', () => {
  it('should log release information', async () => {
    mockReadLine()
    await confirmRelease('FROM', 'TO')
    expect(logInfo).toHaveBeenCalledWith('Creating version TO from FROM')
  })

  it('should log and return false if answer is not Y', async () => {
    mockReadLine('N')
    const confirm = await confirmRelease('FROM', 'TO')
    expect(logInfo).toHaveBeenCalledWith('Aborting release')
    expect(confirm).toBe(false)
  })

  it('should return true if answer is Y', async () => {
    mockReadLine('Y')
    const confirm = await confirmRelease('FROM', 'TO')
    expect(confirm).toBe(true)
  })

  it('should return true if answer is y', async () => {
    mockReadLine('y')
    const confirm = await confirmRelease('FROM', 'TO')
    expect(confirm).toBe(true)
  })

  it('should return true if answer is empty', async () => {
    mockReadLine('')
    const confirm = await confirmRelease('FROM', 'TO')
    expect(confirm).toBe(true)
  })
})

describe('release', () => {
  beforeEach(() => {
    vi.mocked(extractVersion).mockResolvedValue('1.0.0')
  })

  it('should not release if release is not confirmed', async () => {
    mockReadLine('N')
    await release('prod')
    expect(git.checkout).not.toHaveBeenCalledWith()
  })

  it('should get version if version is not provided', async () => {
    mockReadLine('Y')
    await release('prod')
    expect(extractVersion).toHaveBeenCalled()
  })

  it('should not get version if version is provided', async () => {
    mockReadLine('Y')
    await release('prod', '1.0.0')
    expect(extractVersion).not.toHaveBeenCalled()
  })

  it('should checkout correct version', async () => {
    mockReadLine('Y')
    await release('prod')
    expect(git.checkout).toHaveBeenCalledWith('v1.0.0')
  })

  it('should create git tag', async () => {
    mockReadLine('Y')
    await release('prod')
    expect(git.tag).toHaveBeenCalledWith('release-v1.0.0')
  })

  it('should push new tag', async () => {
    mockReadLine('Y')
    await release('prod')
    expect(git.push).toHaveBeenCalledWith('origin release-v1.0.0')
  })

  it('should checkout previously selected branch', async () => {
    mockReadLine('Y')
    await release('prod')
    expect(git.checkout).toHaveBeenCalledWith('-')
  })
})
