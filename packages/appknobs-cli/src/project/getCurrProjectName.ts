import * as findup from 'find-up'
import * as fs from 'fs'

export const getCurrProjectName = (): string => {
  const path = findup.sync('package.json')

  if (!path) {
    throw new Error('Unable to find package.json for the project')
  }

  const pkgjson = fs.readFileSync(path, {encoding: 'utf8'})

  return JSON.parse(pkgjson).name
}
