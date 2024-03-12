import { SpyInstance } from 'vitest'
import { logError, logInfo, logSuccess } from '../../src/logger.js'

describe('logger', () => {
  let logSpy: SpyInstance

  beforeEach(() => {
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined)
  })

  afterEach(() => {
    logSpy.mockRestore()
  })

  it('should log info messages in blue', () => {
    logInfo('Message')
    expect(logSpy).toHaveBeenCalledWith('\x1b[36mMessage\x1b[0m')
  })

  it('should log success messages in green', () => {
    logSuccess('Message')
    expect(logSpy).toHaveBeenCalledWith('\x1b[32mMessage\x1b[0m')
  })

  it('should log error messages in red', () => {
    logError('Message')
    expect(logSpy).toHaveBeenCalledWith('\x1b[31mMessage\x1b[0m')
  })
})
