export enum EnumTokenType {
  CONFIRMATION = "CONFIRMATION",
  RESET_PASSWORD = "RESET_PASSWORD",
  TWO_FACTOR = "TWO_FACTOR"
}

export interface IToken {
  email: string
  token: string
  code: string
  userId: string
  type: EnumTokenType
  expiresAt: Date
}

export type ITokenPayload = Pick<IToken, "token" | "expiresAt" | "code">

export type IGeneratedTokenType = "code" | "token"
