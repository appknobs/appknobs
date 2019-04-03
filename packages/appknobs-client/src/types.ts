export interface EvaluateResult {
  name: string
  result: boolean
}

export interface EvaluatePayload {
  [key: string]: string | number | boolean
}

export interface EvaluateQuery {
  apikey: string
  projectId: string
  payload: EvaluatePayload
}

export type EvaluateApiCall = (
  query: EvaluateQuery,
) => Promise<EvaluateResult[]>

interface EndpointError {
  title: string
}

export interface EndpointResponseObject {
  data: EvaluateResult[]
  error?: EndpointError[]
}

export interface FeaturesAsProps {
  [key: string]: boolean
}

export interface EvaluateResultAsProps {
  features: FeaturesAsProps
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

export interface NewClientProps {
  apiKey: string
  appId: string
}
