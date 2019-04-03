import {customer, forStage} from '@appknobs/services-client'
import * as makeDebug from 'debug'
import * as ora from 'ora'
import {ensureUserIsLoggedIn} from './user/ensureUserIsLoggedIn'

const debug = makeDebug('appknobs:cli:apikey')

export const apiKeyAction = (
  stage,
  cognito,
  loginAction,
  registerAction,
) => async () => {
  await ensureUserIsLoggedIn({
    cognito,
    loginAction,
    registerAction,
    promptText: 'You need to log in to retrieve your API key',
  })

  const spinner = ora(`Retrieving API key`)
  const unable = () =>
    spinner.fail(
      `Unable to retrieve your API key. Please contact us at hello@appknobs.io`,
    )

  try {
    spinner.start()

    const {idToken} = await cognito.get()
    const {data: apiKey, errors} = await forStage(stage)(customer.getApikey)({
      authToken: idToken,
    })

    debug('getApiKeys call finished:')
    debug('apiKey: %o', apiKey)
    debug('errors: %o', errors)

    if (!apiKey || errors) {
      unable()

      return
    }

    spinner.succeed(
      `Your API key is: ${apiKey.apikey} and is valid until ${new Date(
        apiKey.expiresOn,
      )}`,
    )
  } catch (e) {
    debug('Error caught: &o', e)
    unable()
  }
}
