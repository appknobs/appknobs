// https://stackoverflow.com/a/7616484
const toHash = (str: string) => {
  let hash = 0
  let i
  let chr

  if (str.length === 0) {
    return hash
  }
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i)
    // tslint:disable-next-line
    hash = (hash << 5) - hash + chr
    // tslint:disable-next-line:no-bitwise
    hash |= 0 // Convert to 32bit integer
  }

  return hash
}

export const objectHash = (obj: any): string => `${toHash(JSON.stringify(obj))}`
