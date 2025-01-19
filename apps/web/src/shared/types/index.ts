export interface ErrorResponse {
  statusCode: number
  method: string
  timestamp: string
  message: {
    message: string
    error: string
    statusCode: number
  }
}

export interface IAuthLoginRequest {
  email?: string
  name?: string
  password?: string
}

export interface IAuthRegisterRequest {
  email: string
  name: string
  password: string
}

export interface IAuthTokenRequest {
  code: string
}

export interface IAuthLinkRequest {
  token: string
  code: string
  userId: string
}

export interface IUser {
  id: string
  createdAt: Date
  updatedAt: Date
  email: string
  name: string
  password: string | null
  avatarUrl: string | null
  projects: any
  isVerified: boolean
  isTwoFactorEnabled: boolean
}

export interface IUserPayload {
  user: IUser
  accessToken: string
}
