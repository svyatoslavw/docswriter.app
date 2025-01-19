"use client"

import React from "react"

import {
  ConfirmationForm,
  LoginForm,
  RegisterForm,
  Stage,
  VerificationForm,
  useStage
} from "@/features/Auth"

const component: Record<Stage, React.ReactNode> = {
  login: <LoginForm />,
  register: <RegisterForm />,
  confirmation: <ConfirmationForm />,
  verification: <VerificationForm />
}

const AuthFormContainer = () => {
  const { stage } = useStage()

  return component[stage]
}

export { AuthFormContainer }
