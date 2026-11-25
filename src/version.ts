import { extractPackageJson } from '@fethcat/shared'
import { git } from './git.js'
import { logInfo, logSuccess } from './logger.js'
import { bump, setVersion } from './packageJson.js'

export async function version(level: string, dirs: string[]): Promise<void> {
  logInfo(`Bumping ${level} version`)
  const newVersion = bump(extractPackageJson().version, level)
  setVersion(newVersion)
  logSuccess(`New version: ${newVersion}`)
  for (const dir of dirs) {
    logInfo(`Applying ${newVersion} in: ${dir}`)
    setVersion(newVersion, dir)
  }
  logInfo('Push new version')
  await git.add(dirs)
  await git.commit(`v${newVersion}`)
  await git.tag(`v${newVersion}`)
  await git.push()
  await git.push('--tags')
  logSuccess('New version pushed')
}
