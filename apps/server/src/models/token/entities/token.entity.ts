import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { EnumTokenType, IToken } from "../interfaces/token.interface"

@Entity("tokens")
export class Token implements IToken {
  @PrimaryGeneratedColumn("uuid")
  id: string
  @CreateDateColumn({ name: "created_at" })
  createdAt: Date
  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date
  @Column()
  email: string
  @Column({ type: "enum", enum: EnumTokenType, default: EnumTokenType.CONFIRMATION })
  type: EnumTokenType
  @Column()
  expiresAt: Date
  @Column()
  token: string
  @Column()
  userId: string
}
