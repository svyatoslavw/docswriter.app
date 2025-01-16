import { User } from "@/models/user/entities/user.entity"

export interface IToken {
  accessToken: string
  refreshToken: string
}

export interface ITokenPayload extends IToken {
  user: User
}
