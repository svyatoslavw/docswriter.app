import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm"

import { Project } from "@/models/project/entities/project.entity"
import { IUser } from "../interfaces/user.interface"

@Entity({ name: "users" })
export class User implements IUser {
  @PrimaryGeneratedColumn("uuid")
  id: string
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date
  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date
  @Column()
  email: string
  @Column()
  name: string
  @Column({ nullable: true, default: null })
  password: string | null
  @Column({ name: "avatar_url", nullable: true })
  avatarUrl: string
  @OneToMany(() => Project, (project) => project.owner)
  projects: Project[]
}
