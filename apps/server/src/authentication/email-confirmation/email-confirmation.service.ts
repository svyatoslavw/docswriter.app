import { MailService } from "@/common/mails/mail.service"
import { ITokenPayload } from "@/models/token/interfaces/token.interface"
import { TokenService } from "@/models/token/token.service"
import { UserService } from "@/models/user/user.service"
import { Injectable } from "@nestjs/common"

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly mailService: MailService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService
  ) {}

  async confirm(id: string, email: string): Promise<ITokenPayload> {
    const token = await this.tokenService.save("code", id, email)

    await this.mailService.sendConfirmationEmail(email, token.token)

    return this.tokenService.get(id)
  }
}
