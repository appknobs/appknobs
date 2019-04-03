import * as fs from 'fs'
import * as mkdirp from 'mkdirp'
import * as path from 'path'

const userOnlyDirAccess = '0700'
const userOnlyFileAccess = '0600'

export const sanitizeCognitoCachePath = (cachepath: string): void => {
  const dir = path.dirname(cachepath)
  try {
    mkdirp.sync(dir, {mode: userOnlyDirAccess})
  } catch (e) {
    //
  }

  try {
    fs.chmodSync(cachepath, userOnlyFileAccess)
  } catch (e) {
    //
  }
}
