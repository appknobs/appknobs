import * as fetch from 'cross-fetch'
import {newEvaluateApiCall} from './evaluate/fetch'
import {newClient as baseNewClient} from './newClient'

export const newNodeClient = baseNewClient({
  evaluateApiCall: newEvaluateApiCall(fetch),
})
