import { execWithCallbackOnData } from 'async-exec'
import { git } from '../../src/git.js'

vi.mock('async-exec')

describe('add', () => {
  it('should add package.json', async () => {
    await git.add([])
    expect(execWithCallbackOnData).toHaveBeenCalledWith('git add package.json')
  })

  it('should add dirs package.json', async () => {
    await git.add(['dir'])
    expect(execWithCallbackOnData).toHaveBeenCalledWith(`git -C dir add package.json`)
  })
})

describe('commit', () => {
  it('should commit with provided message', async () => {
    await git.commit('message')
    expect(execWithCallbackOnData).toHaveBeenCalledWith('git commit -m "message"')
  })
})

describe('tag', () => {
  it('should create provided tag', async () => {
    await git.tag('tag')
    expect(execWithCallbackOnData).toHaveBeenCalledWith('git tag "tag"')
  })
})

describe('push', () => {
  it('should push', async () => {
    await git.push()
    expect(execWithCallbackOnData).toHaveBeenCalledWith('git push --quiet --no-verify ')
  })

  it('should push with params', async () => {
    await git.push('params')
    expect(execWithCallbackOnData).toHaveBeenCalledWith('git push --quiet --no-verify params')
  })
})

describe('checkout', () => {
  it('should checkout provided branch', async () => {
    await git.checkout('branch')
    expect(execWithCallbackOnData).toHaveBeenCalledWith('git checkout branch')
  })
})
