import { Folder } from "@/models/folder/entities/folder.entity"
import { User } from "@/models/user/entities/user.entity"
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
import { IProject } from "../interfaces/project.interface"

@Entity("projects")
export class Project implements IProject {
  @PrimaryGeneratedColumn("uuid")
  id: string
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date
  @Column()
  name: string
  @Column({ nullable: true })
  description: string
  @Column()
  ownerId: string
  @ManyToOne(() => User, (user) => user.projects)
  @JoinColumn({ name: "owner_id" })
  owner: User
  @OneToMany(() => Folder, (folder) => folder.project)
  folders: Folder[]
}
