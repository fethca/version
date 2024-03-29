import { logError } from './logger.js'

export function exitOnError(error: string | Error): void {
  logError(error)
  process.exit(1)
}
