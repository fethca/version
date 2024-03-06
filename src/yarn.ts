import { execWithCallbackOnData } from 'async-exec'

export const noWorkspace = "Cannot find the root of your workspace - are you sure you're currently in a workspace?"

export const yarn = {
  async version(params: string, dir?: string): Promise<void> {
    const cwd = dir ? `--cwd ${dir}` : ''
    await execWithCallbackOnData(`yarn --silent ${cwd} version --no-git-tag-version ${params}`)
  },
}
