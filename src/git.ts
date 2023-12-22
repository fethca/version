import exec from 'async-exec'

export const git = {
  async add(dirs: string[]): Promise<void> {
    await exec('git add package.json')
    for (const dir of dirs) {
      await exec(`git -C ${dir} add package.json`)
    }
  },

  async commit(message: string): Promise<void> {
    await exec(`git commit -m "${message}"`)
  },

  async tag(tag: string): Promise<void> {
    await exec(`git tag "${tag}"`)
  },

  async push(params = ''): Promise<void> {
    await exec(`git push --quiet --no-verify ${params}`)
  },

  async checkout(branch: string): Promise<void> {
    await exec(`git checkout ${branch}`)
  },
}
