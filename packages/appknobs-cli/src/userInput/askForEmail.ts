import {validate as isValidEmail} from 'email-validator'
import {prompt} from 'enquirer'

const logWrongEmail = (email) =>
  console.log(`Sorry, ${email} doesn\'t look like a valid email address`) // tslint:disable-line:no-console

export const askForEmail = async (emailInput?: string): Promise<string> => {
  if (isValidEmail(emailInput)) {
    return emailInput
  }

  if (!isValidEmail(emailInput) && emailInput && emailInput.length) {
    logWrongEmail(emailInput)
  }

  const {email} = await prompt<{email: string}>([
    {
      type: 'input',
      name: 'email',
      message: 'Email',
    },
  ])

  if (!isValidEmail(email)) {
    logWrongEmail(email)

    return askForEmail('')
  }

  return email
}
