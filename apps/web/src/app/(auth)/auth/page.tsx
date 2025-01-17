import { StageProvider } from "@/features/Auth"
import { AuthFormContainer } from "@/widgets"

export default function Auth() {
  return (
    <StageProvider>
      <AuthFormContainer />
    </StageProvider>
  )
}
