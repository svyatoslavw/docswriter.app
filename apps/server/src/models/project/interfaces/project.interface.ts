import { IFolder } from "@/models/folder/interfaces/folder.interface"
import { IUser } from "@/models/user/interfaces/user.interface"

export interface IProject {
  id: string
  name: string
  description: string | null
  ownerId: string
  owner: IUser | null
  folders: IFolder[] | null
}
