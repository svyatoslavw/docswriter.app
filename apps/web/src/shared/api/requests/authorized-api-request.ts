import { requestMethod } from "./helpers/request-method"

export const authApiRequest = <T>() => {
  const headers = {
    "Access-Control-Allow-Origin": "true"
  }

  const authorization = { authorization: true }

  return {
    get: requestMethod<T>("GET", headers, authorization),
    post: requestMethod<T>("POST", headers, authorization),
    put: requestMethod<T>("PUT", headers, authorization),
    delete: requestMethod<T>("DELETE", headers, authorization),
    patch: requestMethod<T>("PATCH", headers, authorization)
  }
}
