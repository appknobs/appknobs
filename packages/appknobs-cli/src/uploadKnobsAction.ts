import * as makeDebug from 'debug'
import * as ora from 'ora'
import {toSummary} from './output/toSummary'
import {getFlags} from './project/getFlags'
import {getProject} from './project/getProject'
import {serviceErrorMessageMap} from './serviceErrorMessageMap'
import {saveKnob} from './services/saveKnob'
import {ensureUserIsLoggedIn} from './user/ensureUserIsLoggedIn'

const debug = makeDebug('appknobs:uploadKnobs')
const consoleLog = console.log // tslint:disable-line
const hardcodedMatch = ['*.js', '*.jsx', '*.ts', '*.tsx']
const saveKnobSpinner = ora('Saving knobs...')

export const uploadKnobsAction = (
  stage: string,
  cognito,
  loginAction,
  registerAction,
) => async (pathToConsider) => {
  await ensureUserIsLoggedIn({
    cognito,
    loginAction,
    registerAction,
    promptText:
      'You need to log in before you can upload feature flags from your project',
  })
  try {
    const {idToken} = await cognito.get()
    const project = await getProject(stage, idToken)
    debug('app %s', project)

    if (!project) {
      throw new Error('Unable to find the record for this app')
    }

    consoleLog(`App name: ${project.name}`)
    consoleLog(`App ID: ${project.id}`)

    debug('Looking up feature flags under path %s', pathToConsider)
    debug('Looking up feature flags in files matching %s', hardcodedMatch)
    const flags = await getFlags(hardcodedMatch, pathToConsider)
    debug('flags %o', flags)

    if (!flags.length) {
      consoleLog('No feature flags found in the codebase. Bye 👋')

      return
    }

    consoleLog('Found the following feature flags:')
    consoleLog(flags.map((flag) => `👉 ${flag}`).join('\n'))

    saveKnobSpinner.start('Saving')
    const saveKnobToService = saveKnob(stage, idToken, project.id)
    const savePromises = flags.map(saveKnobToService)
    const results = await Promise.all(savePromises)
    saveKnobSpinner.stop()

    consoleLog(results.map(toSummary).join('\n'))
  } catch (error) {
    const reason = serviceErrorMessageMap(error)

    consoleLog(`An error occured: ${reason}`)
    debug('error', error)
  }
}
