import { useStage } from "./useStage"

export const useLoginForm = () => {
  const { stage, setStage } = useStage()

  const onSignUp = () => setStage("register")

  return { onSignUp }
}
