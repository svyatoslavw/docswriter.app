import { authApiRequest } from "../requests/authorized-api-request"

import { IUser } from "@/shared/types"

export const usersApi = {
  getAll: async () => {
    return await authApiRequest().get("users")
  },
  profile: async () => {
    return await authApiRequest<IUser>().get("users/profile")
  }
}
