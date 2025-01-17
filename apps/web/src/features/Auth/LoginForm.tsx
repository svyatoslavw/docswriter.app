"use client"

import { Button, Input, PasswordInput } from "@docswriter/ui/components"
import { GithubIcon, GoogleIcon } from "@docswriter/ui/icons"

import { AuthButton } from "./AuthButton"
import { Footer } from "./Footer"
import { useLoginForm } from "./useLoginForm"

const LoginForm = () => {
  const { onSignUp } = useLoginForm()
  return (
    <div className="xs:w-[230px] mx-auto flex flex-col justify-center space-y-6 rounded-xl px-5 sm:w-[280px] lg:w-[300px] xl:w-[350px] 2xl:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold">Login to your account</h1>
        <h3 className="text-sm">Enter your email and password</h3>
      </div>
      {/*  */}
      <form className="flex flex-col gap-4">
        <Input
          autoComplete="username"
          autoCapitalize="none"
          autoCorrect="off"
          placeholder="your email or login"
        />
        <PasswordInput
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          type="password"
          placeholder="secret password"
        />
        <Button type="submit" className="w-full">
          Sign in
        </Button>
        <div
          onClick={onSignUp}
          className="mx-auto cursor-pointer text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          create your account
        </div>
      </form>
      {/*  */}
      <div className="mx-auto flex w-full items-center justify-evenly text-xs before:mr-4 before:block before:h-px before:flex-grow before:bg-secondary after:ml-4 after:block after:h-px after:flex-grow after:bg-secondary">
        OR CONTINUE WITH
      </div>
      <div className="flex flex-col gap-3">
        <AuthButton credential="github" text="github">
          <GithubIcon className="size-5" />
        </AuthButton>
        <AuthButton credential="google" text="google">
          <GoogleIcon className="size-5" />
        </AuthButton>
      </div>
      <Footer />
    </div>
  )
}

export { LoginForm }
