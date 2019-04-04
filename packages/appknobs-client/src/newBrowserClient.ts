import {newEvaluateApiCall} from './evaluate/fetch'
import {newClient as baseNewClient} from './newClient'

export const newBrowserClient = baseNewClient({
  evaluateApiCall: newEvaluateApiCall(fetch),
})
