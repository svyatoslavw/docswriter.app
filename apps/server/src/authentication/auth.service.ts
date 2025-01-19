import { TokenService } from "@/models/token/token.service"
import { User } from "@/models/user/entities/user.entity"
import { UserService } from "@/models/user/user.service"
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from "@nestjs/common"
import { hash, verify } from "argon2"
import { Response } from "express"
import { LoginDto, RegisterDto } from "./dto/login.dto"
import { EmailConfirmationService } from "./email-confirmation/email-confirmation.service"
import { ITokenPayload, IUserPayload } from "./interfaces/token.interface"
import { TwoFactorVerificationService } from "./two-factor-verification/two-factor-verification.service"

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly emailConfirmationService: EmailConfirmationService,
    private readonly twoFactorVerificationService: TwoFactorVerificationService
  ) {}

  async login(dto: LoginDto, res: Response): Promise<IUserPayload | ITokenPayload> {
    const user = await this.validateUser(dto)

    if (!user) throw new NotFoundException("User not found!")

    if (user.isTwoFactorEnabled) {
      return this.twoFactorVerificationService.send(user.id, user.email)
    }

    if (dto.name && user.name === dto.name) {
      const user = await this.validateUser(dto)
      const { accessToken, refreshToken } = this.tokenService.issueTokens(user.id)

      this.tokenService.addRefreshToken(res, refreshToken)

      return { user, accessToken }
    }

    if (dto.email && user.email === dto.email) {
      return this.emailConfirmationService.send(user.id, user.email)
    }
  }

  async register(dto: RegisterDto): Promise<ITokenPayload> {
    const { email, name, password } = dto

    const oldUser = await this.userService.findByEmail(email)
    if (oldUser) throw new ConflictException("User with this email already exists")

    const user = await this.userService.create({ email, password: await hash(password), name })
    return this.emailConfirmationService.send(user.id, user.email)
  }

  async validateUser(dto: LoginDto): Promise<User> {
    const user = await this.userService.findByCredentials(dto.name, dto.email)

    if (!user) throw new NotFoundException("User not found!")

    if (dto.password) {
      const isValid = await verify(user.password, dto.password)

      if (!isValid) throw new UnauthorizedException("Invalid password")
    }

    return user
  }
}
