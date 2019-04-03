import {customer, forStage, user} from '@appknobs/services-client'
import * as makeDebug from 'debug'
import * as ora from 'ora'
import {serviceErrorMessageMap} from './serviceErrorMessageMap'
import {askForEmail} from './userInput/askForEmail'
import {askForPassword} from './userInput/askForPassword'

type LoginAction = (email: string, pass: string) => Promise<void>

const consoleLog = console.log // tslint:disable-line:no-console
const debug = makeDebug('appknobs:cli:register')

export const registerAction = (
  loginAction: LoginAction,
  stage: string,
  cognito,
) => async (emailArg, passwordArg) => {
  consoleLog(
    // tslint:disable-next-line:max-line-length
    `By registering you accept our Privacy Policy and Terms of Service: https://appknobs.io/privacy, https://appknobs.io/tos`,
  )
  consoleLog('')

  const email = await askForEmail(emailArg)
  const password = await askForPassword(passwordArg)
  const registerUser = forStage(stage)(user.register)
  const getApikey = forStage(stage)(customer.getApikey)
  const spinner = ora(`Registering user ${email}`)

  try {
    spinner.start()

    const {errors: regErrors} = await registerUser(email, password)

    if (regErrors) {
      throw regErrors[0]
    }

    spinner.succeed(`Successfully registered user ${email}`)

    await loginAction(email, password)

    const {idToken: authToken} = await cognito.get()

    const {data: apikeyData, errors: apikeyErrors} = await getApikey({
      authToken,
    })

    if (apikeyErrors) {
      throw apikeyErrors[0]
    }

    spinner.succeed(`Received your API key: ${apikeyData.apikey}`)
  } catch (error) {
    debug('error', error)
    const reason = serviceErrorMessageMap(error)

    spinner.stopAndPersist()
    spinner.fail(`Failed to register user ${email}: ${reason}`)
  }
}
