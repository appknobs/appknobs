import {forStage, knob} from '@appknobs/services-client'
import {serviceErrorMessageMap} from '../serviceErrorMessageMap'
import {serviceErrorToError} from '../serviceErrorToError'
import {AsyncResult} from '../types'

export const saveKnob = (stage: string, token: string, projectId: string) => (
  flag,
): Promise<AsyncResult> =>
  new Promise(async (resolve) => {
    const saveToKnobService = forStage(stage)(knob.save)
    const saveResult = await saveToKnobService({
      authToken: token,
      name: flag,
      projectId,
    })

    const result: AsyncResult = saveResult.errors
      ? {
          type: 'error',
          flag,
          message: serviceErrorMessageMap(
            serviceErrorToError(saveResult.errors[0]),
          ),
        }
      : {
          type: 'success',
          flag,
        }

    resolve(result)
  })
