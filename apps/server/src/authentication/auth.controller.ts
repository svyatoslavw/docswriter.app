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
import { ConfirmationDto, LoginDto, RegisterDto } from "./dto/login.dto"
import { EmailConfirmationService } from "./email-confirmation/email-confirmation.service"

@Controller("auth")
@SerializeOptions({
  groups: extendedUserGroupsForSerializing
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly emailConfirmationService: EmailConfirmationService
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
}
