import {forStage, project as projectService} from '@appknobs/services-client'
import * as makeDebug from 'debug'
import * as ora from 'ora'
import {getCurrProjectName} from './project/getCurrProjectName'
import {removeProject} from './project/removeProject'
import {serviceErrorMessageMap} from './serviceErrorMessageMap'
import {ensureUserIsLoggedIn} from './user/ensureUserIsLoggedIn'
import {aksConfirmNextAction} from './userInput/aksConfirmNextAction'

const debug = makeDebug('appknobs:removeProject')
const consoleLog = console.log // tslint:disable-line
const spinner = ora('Working...')

export const removeProjectAction = (
  stage: string,
  cognito,
  loginAction,
  registerAction,
  uploadKnobsAction,
) => async ({yes}) => {
  await ensureUserIsLoggedIn({
    cognito,
    loginAction,
    registerAction,
  })

  const userProjectList = forStage(stage)(projectService.list)

  try {
    const {idToken} = await cognito.get()
    const {data: userProjects, errors: listErrors} = await userProjectList(
      idToken,
    )
    if (listErrors) {
      throw new Error(listErrors[0].toString())
    }
    const currProjectName = getCurrProjectName()
    const project = userProjects.find(({name}) => name === currProjectName)

    debug('app %s', project)

    if (!project) {
      consoleLog('Seems like this app is not registered on Appknobs yet.')
      consoleLog('You can register you app & feature flags using\n')
      consoleLog('$ appknobs parse src \n')

      const confirmParse = await aksConfirmNextAction(`Run this command now?`)

      if (!confirmParse) {
        consoleLog('Bye for now 👋')

        return
      }

      return uploadKnobsAction('src/')
    }

    consoleLog(`App name: ${project.name}`)
    consoleLog(`App ID: ${project.id}`)

    if (yes !== true) {
      const isConfirmed = await aksConfirmNextAction(
        `This will delete app ${project.name}. Are you sure?`,
      )

      if (!isConfirmed) {
        return
      }
    }

    spinner.start()
    await removeProject(stage, idToken, project.id)
    consoleLog()
    consoleLog(`App ${project.name} deleted 🗑`)
    spinner.stop()
  } catch (error) {
    if (!error) {
      return
    }

    const reason = serviceErrorMessageMap(error)

    consoleLog(`An error occured: ${reason}`)
    spinner.stop()
    debug('error', error)
  }
}
