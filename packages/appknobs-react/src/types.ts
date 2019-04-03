export interface EvaluatePayload {
  [key: string]: string | number | boolean
}

export interface EvaluateResultAsProps {
  features: FeaturesAsProps
}

export interface FeaturesAsProps {
  [key: string]: boolean
}

export type EvaluateFn = (
  payload: EvaluatePayload,
) => Promise<EvaluateResultAsProps>

export type CallbackFn = (newData: EvaluateResultAsProps) => void
export type UnsubscribeFn = () => void

export interface AppknobsClient {
  evaluate: EvaluateFn
  subscribe: (callbackFn: CallbackFn) => UnsubscribeFn
}
