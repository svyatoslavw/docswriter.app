import { ITokens } from "@/authentication/interfaces/token.interface"
import { DatabaseConfigService } from "@/config/database/postgres/config.service"
import { Token } from "@/models/token/entities/token.entity"
import { Injectable, Logger, NotFoundException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { InjectRepository } from "@nestjs/typeorm"
import { Response } from "express"
import { Repository } from "typeorm"
import { IGeneratedTokenType, ITokenPayload } from "./interfaces/token.interface"

@Injectable()
export class TokenService {
  private EXPIRE_DAY = 3
  private REFRESH_TOKEN = "refreshToken"

  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    private readonly postgresConfigService: DatabaseConfigService,
    private readonly jwtServise: JwtService
  ) {}

  private async generate(type: IGeneratedTokenType): Promise<ITokenPayload> {
    if (type === "code") {
      const token = Math.floor(100000 + Math.random() * 900000).toString()
      const expiresAt = new Date(Date.now() + 10 * 60000) // 10 minutes

      return { token, expiresAt }
    }

    const token = crypto.randomUUID()
    const expiresAt = new Date(Date.now() + 10 * 60000) // 10 minutes

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
    Logger.debug(expiresAt, new Date())
    if (expiresAt < new Date()) throw new NotFoundException("Token expired!")

    return { token, expiresAt, email }
  }

  async save(type: IGeneratedTokenType, userId: string, email: string) {
    const { expiresAt, token } = await this.generate(type)

    const result = await this.tokenRepository.save({ userId, email, token, expiresAt })

    if (!result) throw new NotFoundException("Token not saved!")

    return { token, expiresAt }
  }

  async delete(userId: string, email: string, token: string) {
    await this.tokenRepository.delete({ userId, email, token })
  }

  issueTokens(userId: string): ITokens {
    const data = { id: userId }

    const accessToken = this.jwtServise.sign(data, {
      expiresIn: "1d"
    })

    const refreshToken = this.jwtServise.sign(data, {
      expiresIn: "3d"
    })

    return { accessToken, refreshToken }
  }

  addRefreshToken(res: Response, refreshToken: string) {
    const expiresIn = new Date()
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY)

    res.cookie(this.REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      domain: this.postgresConfigService.host,
      expires: expiresIn,
      secure: true,
      sameSite: "lax"
    })
  }

  removeRefreshToken(res: Response) {
    res.cookie(this.REFRESH_TOKEN, "", {
      httpOnly: true,
      domain: this.postgresConfigService.host,
      expires: new Date(0),
      secure: true,
      sameSite: "none"
    })
  }
}
