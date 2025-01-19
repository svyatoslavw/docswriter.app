import { MailService } from "@/common/mails/mail.service"
import { ITokenPayload } from "@/models/token/interfaces/token.interface"
import { TokenService } from "@/models/token/token.service"
import { UserService } from "@/models/user/user.service"
import { Injectable, NotFoundException } from "@nestjs/common"
import { Response } from "express"
import { ConfirmationDto } from "../dto/login.dto"
import { IUserPayload } from "../interfaces/token.interface"

@Injectable()
export class TwoFactorVerificationService {
  constructor(
    private readonly mailService: MailService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService
  ) {}

  async send(id: string, email: string): Promise<ITokenPayload> {
    const tokenData = await this.tokenService.save(id, email)

    await this.mailService.sendTwoFactorEmail(email, tokenData.code)

    return this.tokenService.get(tokenData.code)
  }

  async verificate(dto: ConfirmationDto, res: Response): Promise<IUserPayload> {
    const tokenData = await this.tokenService.get(dto.code)
    if (!tokenData) throw new NotFoundException("Token not found!")

    const user = await this.userService.findByEmail(tokenData.email)
    if (!user) throw new NotFoundException("User not found!")

    await this.userService.update(user.id, { isVerified: true })

    await this.tokenService.delete(user.id, user.email, tokenData.token, tokenData.code)

    const { accessToken, refreshToken } = this.tokenService.issueTokens(user.id)

    this.tokenService.addRefreshToken(res, refreshToken)

    return { user, accessToken }
  }
}
