import {CognitoClient} from '@appknobs/cognito'
import * as makeDebug from 'debug'
import {askLoginOrRegister} from '../userInput/askLoginOrRegister'

interface Env {
  cognito: CognitoClient
  loginAction: () => Promise<void>
  registerAction: () => Promise<void>
  promptText?: string
}

const debug = makeDebug('appknobs:ensureUserIsLoggedIn')
const consoleLog = console.log // tslint:disable-line

export const ensureUserIsLoggedIn = async ({
  cognito,
  loginAction,
  registerAction,
  promptText = 'You need to be logged in for this command',
}: Env) => {
  try {
    await cognito.get()
    debug('user is present')
  } catch (error) {
    consoleLog(promptText)
    consoleLog('')

    const loginOrRegisterChoice = await askLoginOrRegister()

    if (loginOrRegisterChoice === 'quit') {
      consoleLog('Bye 👋')

      return
    }

    if (loginOrRegisterChoice === 'login') {
      await loginAction()
    }

    if (loginOrRegisterChoice === 'register') {
      await registerAction()
    }
  }
}
