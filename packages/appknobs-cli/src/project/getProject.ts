import {forStage, project} from '@appknobs/services-client'
import {getCurrProjectName} from './getCurrProjectName'

interface Project {
  name: string
  id: string
  userId: string
}

export const getProject = async (
  stage: string,
  authToken: string,
): Promise<Project> => {
  const currProjectName = getCurrProjectName()
  const projectList = forStage(stage)(project.list)
  const projectCreate = forStage(stage)(project.create)

  const {data: userProjects, errors: listErrors} = await projectList(authToken)

  if (listErrors) {
    throw new Error(listErrors[0].toString())
  }

  const projectWithSameName = userProjects.find(
    ({name}) => name === currProjectName,
  )

  if (projectWithSameName) {
    return projectWithSameName
  }

  const {data: newProjectRecord, errors: createErrors} = await projectCreate({
    authToken,
    name: currProjectName,
  })

  if (createErrors) {
    throw new Error(createErrors[0].toString())
  }

  return newProjectRecord
}
