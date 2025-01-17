import { cookies } from "next/headers"

import { createFullUrl } from "./create-full-url"

type RequestMethod = "GET" | "HEAD" | "POST" | "PATCH" | "PUT" | "DELETE" | "OPTIONS"
type RequestAuthorization = { authorization?: boolean }

const serverUrl = process.env.SERVER_URL

export function requestMethod(
  method: RequestMethod,
  defaultHeaders: Record<string, string>,
  { authorization }: RequestAuthorization = {}
) {
  return async (url: string) => {
    const tokenName = "accessToken"

    const token = (await cookies()).get(tokenName)?.value

    const requestOptions: RequestInit = {
      method,
      headers: {
        ...defaultHeaders,
        ...(authorization && token && { Authorization: `Bearer ${token}` })
      }
    }

    const targetUrl = createFullUrl(url, serverUrl)

    const response = await fetch(targetUrl, requestOptions)

    if (!response.ok) {
      Promise.reject(response)
    }

    const text = await response.text()

    if (!text || !text.trim()) {
      console.warn("Empty response")
      return null
    }

    try {
      return JSON.parse(text)
    } catch (e: any) {
      console.error("Failed to parse response", e.message)
      return null
    }
  }
}
