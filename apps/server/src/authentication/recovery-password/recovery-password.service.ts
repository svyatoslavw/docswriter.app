import { MailService } from "@/common/mails/mail.service"
import { TokenService } from "@/models/token/token.service"
import { UserEntity } from "@/models/user/serializers/user.serializer"
import { UserService } from "@/models/user/user.service"
import { Injectable, NotFoundException } from "@nestjs/common"
import { hash } from "argon2"
import { NewPasswordDto } from "./dto/new-password.dto"
import { ResetPasswordDto } from "./dto/reset-password.dto"

@Injectable()
export class RecoveryPasswordService {
  constructor(
    private readonly mailService: MailService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService
  ) {}

  async reset(dto: ResetPasswordDto): Promise<void> {
    const user = await this.userService.findByEmail(dto.email)
    if (!user) throw new NotFoundException("User not found!")

    const tokenData = await this.tokenService.save(user.id, user.email)

    return this.mailService.sendResetPasswordEmail(user.email, tokenData.code)
  }

  async new(dto: NewPasswordDto, userToken: string): Promise<UserEntity> {
    const token = await this.tokenService.get(userToken)

    const user = await this.userService.findByEmail(token.email)
    if (!user) throw new NotFoundException("User not found!")

    return this.userService.update(user.id, { password: await hash(dto.password) })
  }
}
