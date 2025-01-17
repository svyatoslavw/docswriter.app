import { requestMethod } from "./helpers/request-method"

export const defaultApiRequest = () => {
  const headers = {
    Accept: "application/json"
  }

  return {
    get: requestMethod("GET", headers),
    post: requestMethod("POST", headers),
    put: requestMethod("PUT", headers),
    delete: requestMethod("DELETE", headers),
    patch: requestMethod("PATCH", headers)
  }
}
