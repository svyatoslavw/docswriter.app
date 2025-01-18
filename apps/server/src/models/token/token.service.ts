import { Token } from "@/models/token/entities/token.entity"
import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { IGeneratedTokenType, ITokenPayload } from "./interfaces/token.interface"

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>
  ) {}

  private async generate(type: IGeneratedTokenType): Promise<ITokenPayload> {
    if (type === "code") {
      const token = Math.floor(100000 + Math.random() * 900000).toString()
      const expiresAt = new Date(Date.now() + 5 * 60000) // 5 minutes

      return { token, expiresAt }
    }

    const token = crypto.randomUUID()
    const expiresAt = new Date(Date.now() + 5 * 60000) // 5 minutes

    return { token, expiresAt }
  }

  async get(userId: string): Promise<ITokenPayload> {
    const { token, expiresAt } = await this.tokenRepository.findOne({ where: { userId } })

    if (!token) throw new NotFoundException("Token not found!")

    if (expiresAt < new Date()) throw new NotFoundException("Token expired!")

    return { token, expiresAt }
  }

  async getByToken(userToken: string): Promise<ITokenPayload & { email: string }> {
    const { token, email, expiresAt } = await this.tokenRepository.findOne({
      where: { token: userToken }
    })

    if (!token) throw new NotFoundException("Token not found!")

    if (expiresAt < new Date()) throw new NotFoundException("Token expired!")

    return { token, expiresAt, email }
  }

  async save(type: IGeneratedTokenType, userId: string, email: string) {
    const { expiresAt, token } = await this.generate(type)

    const result = await this.tokenRepository.save({ userId, email, token, expiresAt })

    if (!result) throw new NotFoundException("Token not saved!")

    return { token, expiresAt }
  }

  async delete(userId: string) {
    await this.tokenRepository.delete({ userId })
  }
}
