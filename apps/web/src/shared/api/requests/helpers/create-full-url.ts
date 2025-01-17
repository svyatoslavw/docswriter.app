export const createFullUrl = (basePath: string, serverUrl?: string) => {
  if (!serverUrl) return basePath

  if (!serverUrl.endsWith("/")) {
    serverUrl += "/"
  }

  const path = `${serverUrl}${basePath}`
  return path
}
