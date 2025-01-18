import { IProject } from "@/models/project/interfaces/project.interface"

export interface IUser {
  email: string
  name: string
  password: string | null
  avatarUrl: string | null
  projects: IProject[] | null
  isVerified: boolean
  isTwoFactorEnabled: boolean
}
