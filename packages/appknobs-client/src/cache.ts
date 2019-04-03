interface Cache {
  lastPayload: {
    [key: string]: any,
  }
  lastResult: any
  timestampMs: number
  ttl: number
}

export const newCache = (ttl: number): Cache => ({
  lastPayload: null,
  lastResult: null,
  timestampMs: new Date().getTime(),
  ttl,
})

export const isCacheHit = (payload: any, cache: Cache): boolean => {
  const currTimestampMs = new Date().getTime()

  if (cache.timestampMs + cache.ttl < currTimestampMs) {
    return false
  }

  if (JSON.stringify(payload) !== JSON.stringify(cache.lastPayload)) {
    return false
  }

  return true
}

export const setLastPayload = (cache: Cache, payload: any) => {
  cache.lastPayload = payload
}

export const getLastResult = (cache: Cache) => cache.lastResult

export const setLastResult = (cache: Cache, lastResult: any) => {
  cache.lastResult = lastResult
  cache.timestampMs = new Date().getTime()
}
