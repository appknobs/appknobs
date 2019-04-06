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
const saveKnobSpinner = ora('Saving knobs...')

export const uploadKnobsAction = (
  stage: string,
  cognito,
  loginAction,
  registerAction,
) => async (pathToConsider, program) => {
  const projectType = program.type === true ? undefined : program.type

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
    consoleLog(`Framework: ${projectType || 'auto-guessing'}`)

    debug('Looking up feature flags under path %s', pathToConsider)
    const flags = await getFlags(pathToConsider, projectType)
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
