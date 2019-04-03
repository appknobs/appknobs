import {AsyncResult} from '../types'

export const toSummary = ({type, flag, message}: AsyncResult) =>
  type === 'success' ? `👍 ${flag} saved` : `😟 ${flag} not saved: ${message}`
