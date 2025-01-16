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
import { LoginDto, RegisterDto } from "./dto/login.dto"

@Controller("auth")
@SerializeOptions({
  groups: extendedUserGroupsForSerializing
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post("login")
  login(@Body() dto: LoginDto, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(dto, response)
  }

  @Post("register")
  register(@Body() dto: RegisterDto, @Res({ passthrough: true }) response: Response) {
    return this.authService.register(dto, response)
  }
}
