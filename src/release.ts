import { createInterface } from 'readline'
import { tagPrefix } from './config.js'
import { extractVersion } from './extract.js'
import { git } from './git.js'
import { logInfo, logSuccess } from './logger.js'

export function confirmRelease(fromVersion: string, toVersion: string): Promise<boolean> {
  logInfo(`Creating version ${toVersion} from ${fromVersion}`)
  const rl = createInterface(process.stdin, process.stdout)
  return new Promise((resolve) => {
    rl.question('Continue with this version? Y/N ', (answer: string) => {
      rl.close()
      if ((answer || 'Y').toUpperCase() !== 'Y') {
        logInfo('Aborting release')
        resolve(false)
      }
      resolve(true)
    })
  })
}

export async function release(env: string, codeVersion?: string): Promise<void> {
  if (!codeVersion) codeVersion = await extractVersion()
  const fromVersion = `v${codeVersion}`
  const toVersion = tagPrefix[env] + codeVersion
  if (await confirmRelease(fromVersion, toVersion)) {
    await git.checkout(fromVersion)
    await git.tag(toVersion)
    await git.push(`origin ${toVersion}`)
    await git.checkout('-')
    logSuccess(`Successfully released ${env} ${toVersion}`)
  }
}
