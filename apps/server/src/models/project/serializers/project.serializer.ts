import { ModelEntity } from "@/models/base/base.serializer"
import { IFolder } from "@/models/folder/interfaces/folder.interface"
import { IProject } from "@/models/project/interfaces/project.interface"
import { IUser } from "@/models/user/interfaces/user.interface"
import { Expose } from "class-transformer"

export const defaultFolderGroupsForSerializing: string[] = ["project.timestamps"]

export const extendedFolderGroupsForSerializing: string[] = [...defaultFolderGroupsForSerializing]
export const allFolderGroupsForSerializing: string[] = [...extendedFolderGroupsForSerializing]
export class ProjectEntity extends ModelEntity implements IProject {
  id: string
  name: string
  @Expose({ groups: ["project.description"] })
  description: string | null
  @Expose({ groups: ["project.timestamps"] })
  createdAt: Date
  @Expose({ groups: ["project.timestamps"] })
  updatedAt: Date
  @Expose({ groups: ["project.folders"] })
  folders: IFolder[]
  @Expose({ groups: ["project.owner"] })
  owner: IUser
  @Expose({ groups: ["project.owner"] })
  ownerId: string
}
