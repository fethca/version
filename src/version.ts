import { extractVersion } from './extract'
import { git } from './git'
import { logInfo, logSuccess } from './logger'
import { yarn } from './yarn'

export async function version(level: string, dirs: string[]): Promise<void> {
  logInfo(`Bumping ${level} version`)
  await yarn.version(`--${level}`)
  const newVersion = await extractVersion()
  logSuccess(`New version: ${newVersion}`)
  for (const dir of dirs) {
    logInfo(`Applying ${newVersion} in: ${dir}`)
    await yarn.version(`--new-version ${newVersion}`, dir)
  }
  logInfo('Push new version')
  await git.add(dirs)
  await git.commit(`v${newVersion}`)
  await git.tag(`v${newVersion}`)
  await git.push()
  await git.push('--tags')
  logSuccess('New version pushed')
}
