import { MailService } from "@/common/mails/mail.service"
import { ITokenPayload } from "@/models/token/interfaces/token.interface"
import { TokenService } from "@/models/token/token.service"
import { UserService } from "@/models/user/user.service"
import { Injectable, NotFoundException } from "@nestjs/common"
import { Response } from "express"
import { ConfirmationDto } from "../dto/login.dto"
import { IUserPayload } from "../interfaces/token.interface"

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly mailService: MailService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService
  ) {}

  async send(id: string, email: string): Promise<ITokenPayload> {
    const token = await this.tokenService.save("code", id, email)

    await this.mailService.sendConfirmationEmail(email, token.token)

    return this.tokenService.get(id)
  }

  async confirm(dto: ConfirmationDto, res: Response): Promise<IUserPayload> {
    const token = await this.tokenService.getByToken(dto.code)

    const user = await this.userService.findByEmail(token.email)
    if (!user) throw new NotFoundException("User not found!")

    await this.userService.update(user.id, { isVerified: true })

    await this.tokenService.delete(user.id, user.email, token.token)

    const { accessToken, refreshToken } = this.tokenService.issueTokens(user.id)

    this.tokenService.addRefreshToken(res, refreshToken)

    return { user, accessToken }
  }
}
