const unknownError = 'Unknown error - Are you connected to the Internet?'

const messageMap = {
  UsernameExistsException: 'The username already exists',
  UserNotFoundException: 'The user does not exist',
  NotAuthorizedException: 'Wrong username or password',
  InvalidParameterException: 'Wrong email or password format',
  UnknownError: unknownError,
  OverPlanLimit: `You have reached your plan's limits. Please upgrade at https://console.appknobs.io/premium`,
}

const toString = (error) =>
  error.toString() === '[object Object]' ? unknownError : error.toString()

interface ServiceError {
  title?: string
  code?: string
}

export const serviceErrorMessageMap = (error: ServiceError = {}): string =>
  messageMap[error.title] || messageMap[error.code] || toString(error)
