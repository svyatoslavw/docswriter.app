import React from "react"
import { useForm } from "react-hook-form"

import { useStage } from "./useStage"
import { authApi } from "@/shared/api/services/auth-api"
import { IAuthRegisterRequest } from "@/shared/types"

interface IAuthRegisterForm extends IAuthRegisterRequest {
  confirmPassword: string
  acceptTerms: boolean
}

export const useRegisterForm = () => {
  const { setStage } = useStage()
  const [loading, setLoading] = React.useState(false)

  const onSignIn = () => setStage("login")

  const form = useForm<IAuthRegisterForm>({
    mode: "onChange",
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false
    }
  })

  const onSubmit = form.handleSubmit(async (data) => {
    const { acceptTerms, confirmPassword, ...rest } = data
    try {
      setLoading(true)
      await authApi.register(rest)
      setStage("confirmation")
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  })

  return { form, functions: { onSubmit, onSignIn }, state: { loading } }
}
