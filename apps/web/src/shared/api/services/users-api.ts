import { authApiRequest } from "../requests/authorized-api-request"

export const usersApi = {
  getAll: async () => {
    return await authApiRequest().get("users")
  }
}
