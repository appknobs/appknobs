import {CognitoClient} from '@appknobs/cognito'
import * as ora from 'ora'

export const showUserAction = (cognito: CognitoClient) => async () => {
  const spinner = ora(`Retrieving information`)

  try {
    spinner.start()

    const {email} = await cognito.get()

    spinner.succeed(`You are logged in as ${email}`)
  } catch (e) {
    spinner.fail(`Your are not currently logged in`)
  }
}
