import { TokenService } from "@/models/token/token.service"
import { extendedUserGroupsForSerializing } from "@/models/user/serializers/user.serializer"
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Res,
  SerializeOptions,
  UseInterceptors
} from "@nestjs/common"
import { Response } from "express"
import { AuthService } from "./auth.service"
import { LinkConfirmationDto } from "./dto/link-confirmation.dto"
import { ConfirmationDto, LoginDto, RegisterDto } from "./dto/login.dto"
import { EmailConfirmationService } from "./email-confirmation/email-confirmation.service"
import { TwoFactorVerificationService } from "./two-factor-verification/two-factor-verification.service"

@Controller("auth")
@SerializeOptions({
  groups: extendedUserGroupsForSerializing
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly emailConfirmationService: EmailConfirmationService,
    private readonly twoFactorVerificationService: TwoFactorVerificationService,
    private readonly tokenService: TokenService
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post("login")
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(dto, response)
  }

  @Post("register")
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto)
  }

  @Post("confirmation")
  async confirm(@Body() dto: ConfirmationDto, @Res({ passthrough: true }) response: Response) {
    return this.emailConfirmationService.confirm(dto, response)
  }

  @Post("confirmation/link")
  async link(@Body() dto: LinkConfirmationDto, @Res({ passthrough: true }) response: Response) {
    return this.emailConfirmationService.link(dto, response)
  }

  @Post("verification")
  async verification(@Body() dto: ConfirmationDto, @Res({ passthrough: true }) response: Response) {
    return this.twoFactorVerificationService.verificate(dto, response)
  }

  @Post("logout")
  async logout(@Res({ passthrough: true }) res: Response) {
    this.tokenService.removeRefreshToken(res)
    return true
  }
}
