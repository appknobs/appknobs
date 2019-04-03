import * as cache from './cache'
import {
  AppknobsClient,
  CallbackFn,
  EvaluateApiCall,
  EvaluateFn,
  EvaluateResult,
  FeaturesAsProps,
  NewClientProps,
} from './types'

const oneMinuteInMs = 60 * 1000

const toFeatureProp = (response: EvaluateResult[]) =>
  response.reduce<FeaturesAsProps>(
    (acc, {name, result}) => ({
      ...acc,
      [name]: result,
    }),
    {},
  )

const newEvaluate = (
  evaluateApiCall: EvaluateApiCall,
  apikey: string,
  projectId: string,
  subscribers: CallbackFn[],
  cacheTtl = oneMinuteInMs,
): EvaluateFn => {
  const evalCache = cache.newCache(cacheTtl)

  return (payload) => {
    if (cache.isCacheHit(payload, evalCache)) {
      return cache.getLastResult(evalCache)
    }

    cache.setLastPayload(evalCache, payload)

    return evaluateApiCall({apikey, projectId, payload})
      .then((result) => {
        if (!result) {
          throw new Error('Empty response from service')
        }

        const evaluationResult = {features: toFeatureProp(result)}
        cache.setLastResult(evalCache, evaluationResult)

        subscribers.forEach((cb) => {
          if (cb) {
            cb(evaluationResult)
          }
        })

        return evaluationResult
      })
      .catch((error) => {
        throw error
      })
  }
}

const newUnsubFn = (subscribers: CallbackFn[], index: number) => () => {
  subscribers[index] = null
}

export const newClient = ({evaluateApiCall}) => ({
  appId: projectId,
  apiKey,
}: NewClientProps): AppknobsClient => {
  const subscribers = []

  return {
    evaluate: newEvaluate(evaluateApiCall, apiKey, projectId, subscribers),
    subscribe: (callbackFn) => {
      const index = subscribers.length

      subscribers[index] = callbackFn

      return newUnsubFn(subscribers, index)
    },
  }
}
