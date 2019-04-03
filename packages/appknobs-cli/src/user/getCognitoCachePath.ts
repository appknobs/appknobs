import * as os from 'os'
import * as path from 'path'

const cacheFileName = 'cognito.json'
const cacheDir = '.appknobs'

export const getCognitoCachePath = (): string => {
  const homedir = os.homedir()

  return path.resolve(homedir, cacheDir, cacheFileName)
}
