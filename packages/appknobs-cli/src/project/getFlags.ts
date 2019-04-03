import {findAllFlags, listFilePaths} from '@appknobs/react-parser'

export const getFlags = async (match: string[], path: string) => {
  const paths = await listFilePaths(match, path)

  return await findAllFlags(paths)
}
