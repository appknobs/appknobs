import {forStage, knob} from '@appknobs/services-client'
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
          message: saveResult.errors[0].toString(),
        }
      : {
          type: 'success',
          flag,
        }

    resolve(result)
  })
