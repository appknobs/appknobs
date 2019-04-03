const host = 'https://api.appknobs.io'

export const getUrl = (projectId, payloadHash) =>
  `${host}/app/${projectId}/evaluatecached?hash=${payloadHash}`
