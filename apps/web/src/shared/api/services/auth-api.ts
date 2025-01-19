import { defaultApiRequest } from "../requests/default-api-request"

import {
  IAuthLinkRequest,
  IAuthLoginRequest,
  IAuthRegisterRequest,
  IAuthTokenRequest,
  IUserPayload
} from "@/shared/types"

export const authApi = {
  login: async (data: IAuthLoginRequest) => {
    return await defaultApiRequest<IUserPayload>().post("auth/login", {
      body: JSON.stringify(data)
    })
  },
  register: async (data: IAuthRegisterRequest) => {
    const res = await defaultApiRequest().post("auth/register", {
      body: JSON.stringify(data)
    })
    console.log(res)
    return res
  },
  confirmation: async (data: IAuthTokenRequest) => {
    const res = await defaultApiRequest().post("auth/confirmation", {
      body: JSON.stringify(data)
    })
    console.log(res)
    return res
  },
  confirmationLink: async (data: IAuthLinkRequest) => {
    const res = await defaultApiRequest().post("auth/confirmation/link", {
      body: JSON.stringify(data)
    })
    console.log(res)
    return res
  },
  logout: async () => await defaultApiRequest().post("auth/logout")
}
