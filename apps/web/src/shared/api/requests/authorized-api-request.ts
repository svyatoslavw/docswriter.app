import { requestMethod } from "./helpers/request-method"

export const authApiRequest = () => {
  const headers = {
    Accept: "application/json"
  }

  const authorization = { authorization: true }

  return {
    get: requestMethod("GET", headers, authorization),
    post: requestMethod("POST", headers, authorization),
    put: requestMethod("PUT", headers, authorization),
    delete: requestMethod("DELETE", headers, authorization),
    patch: requestMethod("PATCH", headers, authorization)
  }
}
