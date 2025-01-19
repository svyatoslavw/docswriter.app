import { User } from "@/models/user/entities/user.entity"
import { createParamDecorator, ExecutionContext, Logger } from "@nestjs/common"

export const CurrentUser = createParamDecorator((data: keyof User, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  const user = request.user
  Logger.debug("user", user)

  if (!user) {
    throw new Error("User not authenticated or user data is missing")
  }

  return data ? user[data] : user
})
