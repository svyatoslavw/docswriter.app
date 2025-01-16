import { ModelEntity } from "@/models/base/base.serializer"
import { IFile } from "@/models/file/interfaces/file.interface"
import { IFolder } from "@/models/folder/interfaces/folder.interface"
import { IProject } from "@/models/project/interfaces/project.interface"
import { Expose } from "class-transformer"

export const defaultFolderGroupsForSerializing: string[] = ["folder.timestamps"]

export const extendedFolderGroupsForSerializing: string[] = [
  ...defaultFolderGroupsForSerializing,
  "folder.project"
]
export const allFolderGroupsForSerializing: string[] = [
  ...extendedFolderGroupsForSerializing,
  "folder.subfolders",
  "folder.parent"
]
export class FolderEntity extends ModelEntity implements IFolder {
  id: string
  name: string
  @Expose({ groups: ["folder.timestamps"] })
  createdAt: Date
  @Expose({ groups: ["folder.timestamps"] })
  updatedAt: Date
  @Expose({ groups: ["folder.files"] })
  files: IFile[]
  @Expose({ groups: ["folder.parent"] })
  parent: IFolder
  @Expose({ groups: ["folder.parent"] })
  parentId: string
  @Expose({ groups: ["folder.project"] })
  project: IProject
  @Expose({ groups: ["folder.project"] })
  projectId: string
  @Expose({ groups: ["folder.subfolders"] })
  subfolders: IFolder[]
}
