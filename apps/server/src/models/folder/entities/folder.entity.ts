import { File } from "@/models/file/entities/file.entity"
import { Project } from "@/models/project/entities/project.entity"
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm"
import { IFolder } from "../interfaces/folder.interface"

@Entity("folders")
export class Folder implements IFolder {
  @PrimaryGeneratedColumn("uuid")
  id: string
  @Column()
  name: string
  @Column({ name: "project_id" })
  projectId: string
  @Column({ name: "parent_id", nullable: true })
  parentId: string
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date
  @ManyToOne(() => Project, (project) => project.folders)
  @JoinColumn({ name: "project_id" })
  project: Project
  @ManyToOne(() => Folder, (folder) => folder.subfolders, { nullable: true })
  @JoinColumn({ name: "parent_id" })
  parent: Folder
  @OneToMany(() => Folder, (folder) => folder.parent)
  subfolders: Folder[]
  @OneToMany(() => File, (file) => file.folder)
  files: File[]
}
