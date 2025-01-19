import { requestMethod } from "./helpers/request-method"

export const defaultApiRequest = <T>() => {
  const headers = {}

  return {
    get: requestMethod<T>("GET", headers),
    post: requestMethod<T>("POST", headers),
    put: requestMethod<T>("PUT", headers),
    delete: requestMethod<T>("DELETE", headers),
    patch: requestMethod<T>("PATCH", headers)
  }
}
