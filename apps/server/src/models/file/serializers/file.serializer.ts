import { ModelEntity } from "@/models/base/base.serializer"
import { IFolder } from "@/models/folder/interfaces/folder.interface"
import { Expose } from "class-transformer"
import { IFile } from "../interfaces/file.interface"

export const defaultFileGroupsForSerializing: string[] = ["file.timestamps"]

export const extendedFileGroupsForSerializing: string[] = [...defaultFileGroupsForSerializing]
export const allFileGroupsForSerializing: string[] = [...extendedFileGroupsForSerializing]
export class FileEntity extends ModelEntity implements IFile {
  id: string
  name: string
  @Expose({ groups: ["file.timestamps"] })
  createdAt: Date
  @Expose({ groups: ["file.timestamps"] })
  updatedAt: Date
  @Expose({ groups: ["file.folder"] })
  folderId: string
  @Expose({ groups: ["file.folder"] })
  folder: IFolder
}
