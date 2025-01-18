"use client"

import { GithubIcon, GoogleIcon } from "@docswriter/ui/icons"
import { Button, Checkbox, Form, FormField, Input, PasswordInput } from "@workspace/ui/components"
import { useForm } from "react-hook-form"

import { AuthButton } from "./AuthButton"
import { Footer } from "./Footer"
import { useRegisterForm } from "./useRegisterForm"
import { authApi } from "@/shared/api/services/auth-api"

interface IRegisterForm {
  email: string
  name: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

const RegisterForm = () => {
  const { onSignIn } = useRegisterForm()

  const form = useForm<IRegisterForm>({
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
    return await authApi.register(data)
  })

  return (
    <div className="xs:w-[230px] mx-auto flex flex-col justify-center space-y-6 rounded-xl px-5 sm:w-[280px] lg:w-[300px] xl:w-[350px] 2xl:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold">Register an your account</h1>
        <h3 className="text-sm">Enter required details for registration</h3>
      </div>
      <Form {...form}>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <Input
                {...field}
                autoComplete="email"
                autoCapitalize="none"
                autoCorrect="off"
                type="email"
                placeholder="your personal email"
              />
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <Input
                {...field}
                autoComplete="username"
                autoCorrect="off"
                placeholder="your personal name"
              />
            )}
          />
          <FormField
            control={form.control}
            name="password"
            rules={{
              validate: (value) =>
                value === form.getValues("confirmPassword") || "Passwords do not match"
            }}
            render={({ field }) => (
              <PasswordInput
                {...field}
                id="password"
                autoComplete="off"
                autoCapitalize="none"
                autoCorrect="off"
                placeholder="secret password"
              />
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            rules={{
              validate: (value) => value === form.getValues("password") || "Passwords do not match"
            }}
            render={({ field }) => (
              <PasswordInput
                error={
                  form.formState.errors.confirmPassword?.message ||
                  form.formState.errors.password?.message
                }
                {...field}
                id="confirmPassword"
                autoComplete="off"
                autoCapitalize="none"
                autoCorrect="off"
                placeholder="confirm your secret password"
              />
            )}
          />

          <div className="items-top flex space-x-2">
            <FormField
              control={form.control}
              name="acceptTerms"
              render={({ field }) => (
                <Checkbox checked={field.value} onCheckedChange={field.onChange} id="terms" />
              )}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept terms and conditions
              </label>
              <p className="text-xs text-muted-foreground">
                You agree to our{" "}
                <a href="/terms" className="underline underline-offset-4 hover:text-primary">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="underline underline-offset-4 hover:text-primary">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>
          <Button type="submit">Continue</Button>
          <div
            onClick={onSignIn}
            className="mx-auto cursor-pointer text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            have account <span className="font-medium">already</span>
          </div>
        </form>
      </Form>
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

export { RegisterForm }
