import {forStage, project} from '@appknobs/services-client'

export const removeProject = (
  stage: string,
  authToken: string,
  projectId: string,
): Promise<void> => {
  const removeProjectCall = forStage(stage)(project.remove)

  return removeProjectCall({authToken, projectId})
}
