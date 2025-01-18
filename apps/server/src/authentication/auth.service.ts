import { MailService } from "@/common/mails/mail.service"
import { DatabaseConfigService } from "@/config/database/postgres/config.service"
import { TokenService } from "@/models/token/token.service"
import { User } from "@/models/user/entities/user.entity"
import { UserService } from "@/models/user/user.service"
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { hash, verify } from "argon2"
import { Response } from "express"
import { LoginDto, RegisterDto } from "./dto/login.dto"
import { EmailConfirmationService } from "./email-confirmation/email-confirmation.service"
import { ITokenPayload, ITokens, IUserPayload } from "./interfaces/token.interface"

@Injectable()
export class AuthService {
  private EXPIRE_DAY = 3
  private REFRESH_TOKEN = "refreshToken"
  private LOGIN_DATE_EXPIRE = new Date(new Date().setDate(new Date().getDate() + 28))

  constructor(
    private readonly userService: UserService,
    private readonly jwtServise: JwtService,
    private readonly postgresConfigService: DatabaseConfigService,
    private readonly mailService: MailService,
    private readonly tokenService: TokenService,
    private readonly emailConfirmationService: EmailConfirmationService
  ) {}

  async login(dto: LoginDto, res: Response): Promise<IUserPayload | ITokenPayload> {
    const user = await this.validateUser(dto)

    if (user.email === dto.email) {
      return this.emailConfirmationService.confirm(user.id, user.email)
    }

    if (user.name === dto.name) {
      const user = await this.validateUser(dto)
      const { accessToken, refreshToken } = this.issueTokens(user.id)

      this.addRefreshToken(res, refreshToken)

      return { user, accessToken }
    }
  }

  async register(dto: RegisterDto, res: Response): Promise<IUserPayload> {
    const { email, name, password } = dto

    const oldUser = await this.userService.findByEmail(email)
    if (oldUser) throw new ConflictException("User with this email already exists")

    const user = await this.userService.create({ email, password: await hash(password), name })
    const { accessToken, refreshToken } = this.issueTokens(user.id)

    this.addRefreshToken(res, refreshToken)

    return { user, accessToken }
  }

  async validateUser(dto: LoginDto): Promise<User> {
    const user =
      (await this.userService.findByEmail(dto.email)) ||
      (await this.userService.findByName(dto.name))

    if (!user) throw new NotFoundException("User not found!")

    if (dto.password) {
      const isValid = await verify(user.password, dto.password)

      if (!isValid) throw new UnauthorizedException("Invalid password")
    }

    return user
  }

  private issueTokens(userId: string): ITokens {
    const data = { id: userId }

    const accessToken = this.jwtServise.sign(data, {
      expiresIn: "1d"
    })

    const refreshToken = this.jwtServise.sign(data, {
      expiresIn: "3d"
    })

    return { accessToken, refreshToken }
  }

  private addRefreshToken(res: Response, refreshToken: string) {
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

  private removeRefreshToken(res: Response) {
    res.cookie(this.REFRESH_TOKEN, "", {
      httpOnly: true,
      domain: this.postgresConfigService.host,
      expires: new Date(0),
      secure: true,
      sameSite: "none"
    })
  }
}
