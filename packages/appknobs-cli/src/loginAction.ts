import * as makeDebug from 'debug'
import * as ora from 'ora'
import {serviceErrorMessageMap} from './serviceErrorMessageMap'
import {askForEmail} from './userInput/askForEmail'
import {askForPassword} from './userInput/askForPassword'

const debug = makeDebug('appknobs:cli:login')

export const loginAction = (cognito) => async (
  emailArg?: string,
  passwordArg?: string,
) => {
  const email = await askForEmail(emailArg)
  const password = await askForPassword(passwordArg)

  await cognito.logout()

  const spinner = ora(`Logging in user ${email}`)

  try {
    spinner.start()

    const {errors} = await cognito.login(email, password)

    if (errors) {
      throw errors[0]
    }

    spinner.stopAndPersist()
    spinner.succeed(`Successfully logged in user ${email}`)
  } catch (error) {
    debug('error', error)
    const reason = serviceErrorMessageMap(error)

    spinner.stopAndPersist()
    spinner.fail(`Failed to log in user ${email}: ${reason}`)
  }
}
