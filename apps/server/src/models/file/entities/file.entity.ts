import { Folder } from "@/models/folder/entities/folder.entity"
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm"
import { IFile } from "../interfaces/file.interface"

@Entity({ name: "files" })
export class File implements IFile {
  @PrimaryGeneratedColumn("uuid")
  id: string
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date
  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date
  @Column()
  name: string
  @Column({ name: "folder_id" })
  folderId: string
  @ManyToOne(() => Folder, (folder) => folder.files)
  @JoinColumn({ name: "folder_id" })
  folder: Folder
}
