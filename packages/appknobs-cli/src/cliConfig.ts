import * as cosmiconfig from 'cosmiconfig'
import {writeFileSync} from 'fs'
import {resolve} from 'path'

interface Config {
  token: string
}

const configAppName = 'appknobs'
const configFileName = `.${configAppName}rc`
const explorer = cosmiconfig(configAppName)

// The config file `.appknobsrc` will be found by cosmiconfig automatically
export const getConfig = (): Config => {
  explorer.clearCaches()
  const result = explorer.searchSync()

  return result ? result.config : {}
}

export const writeConfig = (targetDir, config) => {
  const path = resolve(targetDir, configFileName)

  return writeFileSync(path, JSON.stringify(config), {encoding: 'utf8'})
}

export const mergeConfig = (targetDir: string, newValues: object) => {
  const config = getConfig()

  const newConfig = {
    ...config,
    ...newValues,
  }

  writeConfig(targetDir, newConfig)
}
