import { IFolder } from "@/models/folder/interfaces/folder.interface"

export interface IFile {
  name: string
  folderId: string
  folder: IFolder
}
