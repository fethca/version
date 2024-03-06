import { exitOnError } from '../src/exit.js'
import { logError } from '../src/logger.js'

vi.mock('../src/logger')

describe('exitOnError', () => {
  it('should log error and exit with code "1"', () => {
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => undefined as never)
    exitOnError('Error')
    expect(logError).toHaveBeenCalledWith('Error')
    expect(exitSpy).toHaveBeenCalledWith(1)
    exitSpy.mockRestore()
  })
})
