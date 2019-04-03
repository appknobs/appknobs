import {prompt} from 'enquirer'

export const aksConfirmNextAction = async (
  message: string = 'Are you sure?',
): Promise<boolean> => {
  const {choice} = await prompt<{choice: boolean}>([
    {
      type: 'confirm',
      name: 'choice',
      message,
      separator: () => '',
      format: () => '',
    },
  ])

  return choice
}
