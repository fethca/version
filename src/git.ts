import { execWithCallbackOnData } from 'async-exec'

export const git = {
  async add(dirs: string[]): Promise<void> {
    await execWithCallbackOnData('git add package.json')
    for (const dir of dirs) {
      await execWithCallbackOnData(`git -C ${dir} add package.json`)
    }
  },

  async commit(message: string): Promise<void> {
    await execWithCallbackOnData(`git commit -m "${message}"`)
  },

  async tag(tag: string): Promise<void> {
    await execWithCallbackOnData(`git tag "${tag}"`)
  },

  async push(params = ''): Promise<void> {
    await execWithCallbackOnData(`git push --quiet --no-verify ${params}`)
  },

  async checkout(branch: string): Promise<void> {
    await execWithCallbackOnData(`git checkout ${branch}`)
  },
}
