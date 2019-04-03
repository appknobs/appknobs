import {prompt} from 'enquirer'

const logWrongPassword = () =>
  console.log('Your password needs to be 9 to 200 characters long') // tslint:disable-line:no-console

const isValidLength = (s) => s.length >= 9 && s.length <= 200

export const askForPassword = async (
  passwordInput: string = '',
): Promise<string> => {
  if (isValidLength(passwordInput)) {
    return passwordInput
  }

  if (passwordInput.length && !isValidLength(passwordInput)) {
    logWrongPassword()
  }

  const {password} = await prompt<{password: string}>([
    {
      type: 'password',
      name: 'password',
      message: 'Password',
    },
  ])

  if (!isValidLength(password)) {
    logWrongPassword()

    return askForPassword('')
  }

  return password
}
