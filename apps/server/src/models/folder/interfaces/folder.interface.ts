import { IFile } from "@/models/file/interfaces/file.interface"
import { IProject } from "@/models/project/interfaces/project.interface"

export interface IFolder {
  name: string
  projectId: string
  parentId: string | null
  project: IProject | null
  parent: IFolder | null
  subfolders: IFolder[] | null
  files: IFile[] | null
}
