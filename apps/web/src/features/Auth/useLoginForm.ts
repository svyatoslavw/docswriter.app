import { useRouter } from "next/navigation"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"

import { useStage } from "./useStage"
import { authApi } from "@/shared/api/services/auth-api"

export type IAuthLoginForm = {
  credential: string
  password?: string
}

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const useLoginForm = () => {
  const { setStage } = useStage()
  const { push } = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [credential, setCredential] = React.useState<"login" | "email">("login")

  const form = useForm<IAuthLoginForm>({
    defaultValues: {
      credential: "",
      password: ""
    }
  })

  const email = form.watch("credential")

  useEffect(() => {
    setCredential(isValidEmail(email) ? "email" : "login")
  }, [email])

  const onSubmit = form.handleSubmit(async (data) => {
    setLoading(true)
    try {
      const payload =
        credential === "login"
          ? { name: data.credential, password: data.password }
          : { email: data.credential }

      if (credential === "email") {
        localStorage.setItem("email", data.credential)
      }

      const response = await authApi.login(payload)
      console.log("@response", response)

      if (!response) return

      if (response.user.isTwoFactorEnabled) {
        setStage("verification")
        return
      }

      credential === "login" ? push("/") : setStage("verification")
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  })

  const onSignUp = () => setStage("register")

  return {
    form,
    functions: { onSubmit, onSignUp },
    state: { loading, isEmail: credential === "email" }
  }
}
