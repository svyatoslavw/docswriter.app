// import { cookies as cookiesNext } from "next/headers";
import { defaultApiRequest } from "../requests/default-api-request"

export const authApi = {
  register: async (data: { email: string; name: string; password: string }) => {
    // const cookies = await cookiesNext()
    const res = await defaultApiRequest().post("auth/register", {
      body: JSON.stringify(data)
    })
    console.log(res)
    // cookies.set("accessToken", res.accessToken)
    return res
  },
  confirmation: async (data: { token: string; email: string }) => {
    const res = await defaultApiRequest().post("auth/confirmation", {
      body: JSON.stringify(data)
    })
    console.log(res)
    return res
  },
  login: async (data: { email: string; password: string }) => {
    // const cookies = await cookiesNext()
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      body: JSON.stringify(data)
    })
    console.log(res)
    // cookies.set("accessToken", res.accessToken)
    return res
  }
}
