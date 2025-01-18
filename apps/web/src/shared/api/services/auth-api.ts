// import { cookies as cookiesNext } from "next/headers";
import { authApiRequest } from "../requests/authorized-api-request"

export const authApi = {
  register: async (data: { email: string; name: string; password: string }) => {
    // const cookies = await cookiesNext()
    const res = await authApiRequest().post("auth/register", {
      body: JSON.stringify(data),
      credentials: "include"
    })
    console.log(res)
    // cookies.set("accessToken", res.accessToken)
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
