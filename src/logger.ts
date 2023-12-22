export function logInfo(message: string): void {
  console.log(`\x1b[36m${message}\x1b[0m`)
}

export function logSuccess(message: string): void {
  console.log(`\x1b[32m${message}\x1b[0m`)
}

export function logError(message: string | Error): void {
  console.log(`\x1b[31m${message}\x1b[0m`)
}
