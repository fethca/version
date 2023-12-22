import { envs, versionLevel } from './config'
import { exitOnError } from './exit'
import { release } from './release'
import { version } from './version'

function invalidArg(type: string, value: string, values: string[]) {
  return `Invalid ${type} "${value}", should be one of: ${values.join(',')}`
}

export async function run(argv: string[]): Promise<void> {
  const [command] = argv

  if (command === 'release') {
    // E.g version release qa
    const [, env, codeVersion] = argv
    if (!envs.includes(env)) {
      return exitOnError(invalidArg('environment', env, envs))
    }
    await release(env, codeVersion).catch((error) => {
      exitOnError(error.message)
    })
  } else {
    // E.g version patch
    const [level, ...dirs] = argv
    if (!versionLevel.includes(level)) {
      return exitOnError(invalidArg('version level', level, versionLevel))
    }
    await version(level, dirs).catch((error) => {
      exitOnError(error.message)
    })
  }
}
