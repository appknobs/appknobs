import {
  findAllFlags,
  guessFramework,
  listFilePaths,
  ProjectType,
} from '@appknobs/code-parser'

type ForcedProjectType = 'react' | 'angular'

const projTypeMap = {
  angular: ProjectType.ANGULAR,
  react: ProjectType.REACT,
}

export const getFlags = async (
  path: string,
  forcedProjType?: ForcedProjectType,
) => {
  const paths = await listFilePaths(path)

  const projtype = forcedProjType
    ? projTypeMap[forcedProjType]
    : guessFramework(paths)

  return await findAllFlags(paths, projtype)
}
