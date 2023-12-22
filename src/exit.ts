import { logError } from './logger'

export function exitOnError(error: string | Error): void {
  logError(error)
  process.exit(1)
}
