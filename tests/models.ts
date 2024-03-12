import { IPackageJson } from '@fethcat/shared'

export const mockPackageJson = (json?: IPackageJson): IPackageJson => {
  return {
    version: '1.0.0',
    name: 'my-app',
    ...json,
  }
}
