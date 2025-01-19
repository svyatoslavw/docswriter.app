"use client"

import { redirect, useSearchParams } from "next/navigation"
import React, { useEffect } from "react"

import { authApi } from "@/shared/api/services/auth-api"

const ConfirmationPage = () => {
  const [isSuccess, setIsSuccess] = React.useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    let mounted = true

    const token = searchParams.get("token")
    const code = searchParams.get("code")
    const userId = searchParams.get("userId")

    if (!token || !code || !userId) redirect("/auth")

    const fetchData = async () => {
      const response = await authApi.confirmationLink({ token, code, userId })
      setIsSuccess(!!response.accessToken)
    }

    fetchData()

    return () => {
      mounted = false
    }
  }, [])

  if (isSuccess) redirect("/")

  return (
    <main className="h-screen w-full flex justify-center items-center">
      {isSuccess && <p className="text-xl font-semibold">Email confirmed successfully</p>}
    </main>
  )
}

export { ConfirmationPage }
