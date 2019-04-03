import * as fetch from 'electron-fetch'
import {newEvaluateApiCall} from './evaluate/fetch'
import {newClient as baseNewClient} from './newClient'

export const newElectronClient = baseNewClient({
  evaluateApiCall: newEvaluateApiCall(fetch.default),
})
