import { execWithCallbackOnData } from 'async-exec'
import { yarn } from '../../src/yarn.js'

vi.mock('async-exec')

describe('version', () => {
  it('should create version', async () => {
    await yarn.version('params')
    expect(execWithCallbackOnData).toHaveBeenCalledWith('yarn --silent  version --no-git-tag-version params')
  })

  it('should create version in provided cwd', async () => {
    await yarn.version('params', 'cwd')
    expect(execWithCallbackOnData).toHaveBeenCalledWith('yarn --silent --cwd cwd version --no-git-tag-version params')
  })
})
