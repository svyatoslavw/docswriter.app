import { ITokens } from "@/authentication/interfaces/token.interface"
import { DatabaseConfigService } from "@/config/database/postgres/config.service"
import { Token } from "@/models/token/entities/token.entity"
import { Injectable, Logger, NotFoundException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { InjectRepository } from "@nestjs/typeorm"
import { Response } from "express"
import { Repository } from "typeorm"
import { ITokenPayload } from "./interfaces/token.interface"

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

  private async generate(): Promise<ITokenPayload> {
    const codeToken = Math.floor(100000 + Math.random() * 900000).toString()
    const linkToken = crypto.randomUUID()
    const expiresAt = new Date(Date.now() + 10 * 60000) // 10 minutes

    return { token: linkToken, code: codeToken, expiresAt }
  }

  async get(userCode: string): Promise<Token> {
    const tokenData = await this.tokenRepository.findOne({
      where: [{ code: userCode }, { token: userCode }]
    })

    if (!tokenData.token) throw new NotFoundException("Token not found!")
    Logger.debug(tokenData.expiresAt, new Date())
    if (tokenData.expiresAt < new Date()) throw new NotFoundException("Token expired!")

    return tokenData
  }

  async save(userId: string, email: string): Promise<Token> {
    const token = await this.generate()

    const result = await this.tokenRepository.save({
      userId,
      email,
      token: token.token,
      code: token.code,
      expiresAt: token.expiresAt
    })

    if (!result) throw new NotFoundException("Token not saved!")

    return result
  }

  async delete(userId: string, email: string, token: string, code: string) {
    await this.tokenRepository.delete({ userId, email, token, code })
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
    res.clearCookie(this.REFRESH_TOKEN, { domain: this.postgresConfigService.host })
  }
}
