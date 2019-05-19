export const serviceErrorToError = (errors) => {
  const error = Array.isArray(errors) ? errors[0] : errors

  if (error.code) {
    return error
  }

  if (error.title) {
    const newError = new Error(error.title)
    // @ts-ignore
    newError.code = error.title

    return newError
  }

  return new Error(error)
}
