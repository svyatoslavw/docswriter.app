import { IToken } from "@/models/token/interfaces/token.interface"
import { User } from "@/models/user/entities/user.entity"

export interface ITokens {
  accessToken: string
  refreshToken: string
}

export interface IUserPayload {
  accessToken: string
  user: User
}

export type ITokenPayload = Pick<IToken, "token" | "expiresAt">
