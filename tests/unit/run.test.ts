import { exitOnError } from '../../src/exit.js'
import { release } from '../../src/release.js'
import { run } from '../../src/run.js'
import { version } from '../../src/version.js'

vi.mock('../../src/exit')
vi.mock('../../src/release')
vi.mock('../../src/version')

describe('run', () => {
  beforeEach(() => {
    vi.mocked(release).mockResolvedValue(undefined)
    vi.mocked(version).mockResolvedValue(undefined)
  })

  it('should exit if command is "release" and env is invalid', async () => {
    await run(['release', 'invalid env', '1.0.0'])
    expect(exitOnError).toHaveBeenCalledWith('Invalid environment "invalid env", should be one of: prod')
    expect(release).not.toHaveBeenCalled()
    expect(version).not.toHaveBeenCalled()
  })

  it('should run release if command is "release" and env is valid', async () => {
    await run(['release', 'prod'])
    expect(exitOnError).not.toHaveBeenCalled()
    expect(release).toHaveBeenCalledWith('prod', undefined)
    expect(version).not.toHaveBeenCalled()
  })

  it('should run release with custom code version', async () => {
    await run(['release', 'prod', '1.0.0'])
    expect(exitOnError).not.toHaveBeenCalled()
    expect(release).toHaveBeenCalledWith('prod', '1.0.0')
    expect(version).not.toHaveBeenCalled()
  })

  it('should exit on release error', async () => {
    vi.mocked(release).mockRejectedValue(new Error('This is an error'))
    await run(['release', 'prod', '1.0.0'])
    expect(exitOnError).toHaveBeenCalledWith('This is an error')
  })

  it('should exit if command is not "release" and level is invalid', async () => {
    await run(['invalid level'])
    expect(exitOnError).toHaveBeenCalledWith(
      'Invalid version level "invalid level", should be one of: patch,minor,major'
    )
    expect(release).not.toHaveBeenCalled()
    expect(version).not.toHaveBeenCalled()
  })

  it('should run version if command is not "release" and level is valid', async () => {
    vi.spyOn(process, 'cwd').mockReturnValue('cwd')
    await run(['minor'])
    expect(exitOnError).not.toHaveBeenCalled()
    expect(release).not.toHaveBeenCalled()
    expect(version).toHaveBeenCalledWith('minor', [])
  })

  it('should exit on version error', async () => {
    vi.mocked(version).mockRejectedValue(new Error('This is an error'))
    await run(['minor'])
    expect(exitOnError).toHaveBeenCalledWith('This is an error')
  })
})
