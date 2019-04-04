import {newEvaluateApiCall} from './evaluate/fetch'
import {newClient as baseNewClient} from './newClient'

export const newRNClient = baseNewClient({
  evaluateApiCall: newEvaluateApiCall(fetch),
})
