import { ModelEntity } from "@/models/base/base.serializer"
import { Project } from "@/models/project/entities/project.entity"
import { Expose } from "class-transformer"
import { IUser } from "../interfaces/user.interface"

export const defaultUserGroupsForSerializing: string[] = ["user.timestamps"]

export const extendedUserGroupsForSerializing: string[] = [...defaultUserGroupsForSerializing]
export const allUserGroupsForSerializing: string[] = [
  ...extendedUserGroupsForSerializing,
  "user.password",
  "user.avatar"
]
export class UserEntity extends ModelEntity implements IUser {
  id: string
  email: string
  name: null | string
  @Expose({ groups: ["user.password"] })
  password: string
  @Expose({ groups: ["user.timestamps"] })
  createdAt: Date
  @Expose({ groups: ["user.timestamps"] })
  updatedAt: Date
  @Expose({ groups: ["user.avatar"] })
  avatarUrl: string
  projects: Project[]
}
