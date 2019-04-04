import {getUrl} from '../getUrl'
import {objectHash} from '../objectHash'
import {EndpointResponseObject, EvaluateApiCall} from '../types'

const handleJsonParseError = () => new Error('Unable to parse response')
const handleNeworkError = (response) => {
  if (!response.ok) {
    throw Error(response.statusText)
  }

  return response
}
const parseJsonResponse = ({data, error}: EndpointResponseObject) => {
  if (error && error.length) {
    throw new Error(error[0].title)
  }

  if (!data || !data.length) {
    return []
  }

  return data
}

export const newEvaluateApiCall = (fetch): EvaluateApiCall => {
  return ({apikey, projectId, payload}) => {
    const hash = objectHash(payload)
    const url = getUrl(projectId, hash)
    const init = {
      body: JSON.stringify({
        payload,
      }),
      headers: {
        'x-api-key': apikey,
        'content-type': 'application/json; charset=utf-8',
      },
      method: 'POST',
    }

    return fetch(url, init)
      .catch(handleNeworkError)
      .then((response) =>
        response
          .json()
          .then(parseJsonResponse)
          .catch(handleJsonParseError),
      )
  }
}
