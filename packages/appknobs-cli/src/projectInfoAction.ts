import * as makeDebug from 'debug'
import * as ora from 'ora'
import {getProject} from './project/getProject'
import {ensureUserIsLoggedIn} from './user/ensureUserIsLoggedIn'

const debug = makeDebug('appknobs:cli:apikey')

export const projectInfoAction = (
  stage,
  cognito,
  loginAction,
  registerAction,
) => async () => {
  await ensureUserIsLoggedIn({
    cognito,
    loginAction,
    registerAction,
    promptText: 'You need to log in to retrieve project information',
  })

  const spinner = ora(`Retrieving information`)
  const unable = () =>
    spinner.fail(
      `Unable to retrieve project information. Please contact us at hello@appknobs.io`,
    )

  try {
    spinner.start()

    const {idToken} = await cognito.get()
    const {name, id} = await getProject(stage, idToken)

    debug('getProject call finished:')
    debug('project: %o %o', name, id)

    if (!name || !id) {
      unable()

      return
    }

    spinner.succeed(`App name: ${name}`)
    spinner.succeed(`appID: ${id}`)
  } catch (e) {
    debug('Error caught: &o', e)
    unable()
  }
}
