import {prompt} from 'enquirer'

type Choice = 'login' | 'register' | 'quit'

export const askLoginOrRegister = async (): Promise<Choice> => {
  const {choice} = await prompt<{choice: Choice}>([
    {
      type: 'select',
      name: 'choice',
      message: 'Would you like to log in or register now?',
      choices: [
        {message: 'Log in', value: 'login'},
        {message: 'Register', value: 'register'},
        {message: 'Quit', value: 'quit'},
      ],
    },
  ])

  return choice
}
