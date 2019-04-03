import * as makeDebug from 'debug'
import * as ora from 'ora'
import {serviceErrorMessageMap} from './serviceErrorMessageMap'

const debug = makeDebug('appknobs:cli:logout')

export const logoutAction = (cognito) => async () => {
  const spinner = ora()

  try {
    spinner.start()

    await cognito.logout()

    spinner.stopAndPersist()
    spinner.succeed(`You are logged out`)
  } catch (error) {
    debug('error', error)
    const reason = serviceErrorMessageMap(error)

    spinner.stopAndPersist()
    spinner.fail(`Error during logout: ${reason}`)
  }
}
