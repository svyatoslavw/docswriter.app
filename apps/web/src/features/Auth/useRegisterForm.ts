import { useStage } from "./useStage"

export const useRegisterForm = () => {
  const { stage, setStage } = useStage()

  const onSignIn = () => setStage("login")

  return { onSignIn }
}
