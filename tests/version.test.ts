import { extractVersion } from '../src/extract.js'
import { git } from '../src/git.js'
import { version } from '../src/version.js'
import { yarn } from '../src/yarn.js'

vi.mock('../src/extract')
vi.mock('../src/git')
vi.mock('../src/logger')
vi.mock('../src/yarn')

describe('version', () => {
  beforeEach(() => {
    vi.mocked(extractVersion).mockResolvedValue('1.0.0')
  })

  it('should create version according to version level', async () => {
    await version('minor', [])
    expect(yarn.version).toHaveBeenCalledWith('--minor')
  })

  it('should bump dirs version', async () => {
    await version('minor', ['dir1'])
    expect(yarn.version).toHaveBeenCalledWith('--new-version 1.0.0', 'dir1')
  })

  it('should commit new version', async () => {
    await version('minor', ['dir'])
    expect(git.add).toHaveBeenCalledWith(['dir'])
    expect(git.commit).toHaveBeenCalledWith('v1.0.0')
  })

  it('should tag new version', async () => {
    await version('minor', [])
    expect(git.tag).toHaveBeenCalledWith('v1.0.0')
  })

  it('should push commits', async () => {
    await version('minor', [])
    expect(git.push).toHaveBeenCalledWith()
  })

  it('should push tags', async () => {
    await version('minor', [])
    expect(git.push).toHaveBeenCalledWith('--tags')
  })
})
