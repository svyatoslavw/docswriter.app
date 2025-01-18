"use client"

import { useRouter } from "next/navigation"
import React from "react"
import { useForm } from "react-hook-form"

import { authApi } from "@/shared/api/services/auth-api"

interface IAuthEmailLoginForm {
  email: string
  token: string
}

export const useConfirmationForm = () => {
  const { push } = useRouter()

  const countDownRef = React.useRef<NodeJS.Timeout>()
  const [seconds, setSeconds] = React.useState(20)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (!seconds) return
    countDownRef.current = setInterval(() => setSeconds((seconds) => seconds - 1), 1000)
    return () => clearInterval(countDownRef.current)
  }, [!!seconds])

  React.useEffect(() => {
    if (!seconds) clearInterval(countDownRef.current)
  }, [seconds])

  const confirmationForm = useForm<IAuthEmailLoginForm>({
    defaultValues: {
      email: localStorage.getItem("email")!,
      token: ""
    }
  })

  const onSubmit = confirmationForm.handleSubmit(async (values: IAuthEmailLoginForm) => {
    try {
      setLoading(true)
      return authApi.confirmation(values)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  })

  const sendTokenAgain = () => console.log("sendTokenAgain")

  return {
    state: {
      loading,
      seconds
    },
    form: confirmationForm,
    functions: { onSubmit, sendTokenAgain }
  }
}
