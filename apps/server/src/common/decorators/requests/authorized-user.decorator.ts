import { JwtGuard } from "@/common/guards/jwt.guard"
import { UseGuards } from "@nestjs/common"

export const Auth = () => UseGuards(JwtGuard)
