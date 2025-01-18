export const createFullUrl = (basePath: string, serverUrl?: string) => {
  if (!serverUrl) return basePath

  const path = `${serverUrl}/${basePath}`
  return path
}
