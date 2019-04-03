import {Env, newNodeClient} from '@appknobs/cognito'
import * as makeDebug from 'debug'
import {apiKeyAction as makeApiKeyAction} from './apiKeyAction'
import {loginAction as makeLoginAction} from './loginAction'
import {logoutAction as makeLogoutAction} from './logoutAction'
import {projectInfoAction as makeProjectInfoAction} from './projectInfoAction'
import {registerAction as makeRegisterAction} from './registerAction'
import {removeProjectAction as makeRemoveProjectAction} from './removeProjectAction'
import {showUserAction as makeShowUserAction} from './showUserAction'
import {uploadKnobsAction as makeUploadKnobsAction} from './uploadKnobsAction'
import {getCognitoCachePath} from './user/getCognitoCachePath'
import {sanitizeCognitoCachePath} from './user/sanitizeCognitoCachePath'

export const setupRuntime = () => {
  const debug = makeDebug('appknobs:cli')
  const host = process.env.APPKNOBS_API_HOST
  const congnitoStage = process.env.APPKNOBS_COGNITO_STAGE

  const cognitoCachePath = getCognitoCachePath()
  debug('cognitoCachePath %s', cognitoCachePath)

  try {
    sanitizeCognitoCachePath(cognitoCachePath)
  } catch (error) {
    console.error(error) // tslint:disable-line:no-console
    throw error
  }

  const cognito = newNodeClient(cognitoCachePath, {stage: congnitoStage} as Env)
  const loginAction = makeLoginAction(cognito)
  const logoutAction = makeLogoutAction(cognito)
  const registerAction = makeRegisterAction(loginAction, host, cognito)
  const apiKeyAction = makeApiKeyAction(
    host,
    cognito,
    loginAction,
    registerAction,
  )
  const uploadKnobsAction = makeUploadKnobsAction(
    host,
    cognito,
    loginAction,
    registerAction,
  )
  const projectInfoAction = makeProjectInfoAction(
    host,
    cognito,
    loginAction,
    registerAction,
  )
  const removeProjectAction = makeRemoveProjectAction(
    host,
    cognito,
    loginAction,
    registerAction,
    uploadKnobsAction,
  )
  const showUserAction = makeShowUserAction(cognito)

  return {
    apiKeyAction,
    cognito,
    loginAction,
    logoutAction,
    projectInfoAction,
    registerAction,
    removeProjectAction,
    showUserAction,
    stage: host,
    uploadKnobsAction,
  }
}
