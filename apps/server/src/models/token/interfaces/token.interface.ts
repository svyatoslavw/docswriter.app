export enum EnumTokenType {
  CONFIRMATION = "CONFIRMATION",
  RESET_PASSWORD = "RESET_PASSWORD",
  TWO_FACTOR = "TWO_FACTOR"
}

export interface IToken {
  email: string
  token: string
  userId: string
  type: EnumTokenType
  expiresAt: Date
}

export type ITokenPayload = Pick<IToken, "token" | "expiresAt">

export type IGeneratedTokenType = "code" | "token"
