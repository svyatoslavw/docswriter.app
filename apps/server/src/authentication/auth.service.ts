import { DatabaseConfigService } from "@/config/database/postgres/config.service"
import { getEmailHtml } from "@/mails/verification/content"
import { User } from "@/models/user/entities/user.entity"
import { UserService } from "@/models/user/user.service"
import { MailerService } from "@nestjs-modules/mailer"
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { hash, verify } from "argon2"
import { Response } from "express"
import { ConfirmationService } from "./confirmation/confirmation.service"
import { LoginDto, RegisterDto } from "./dto/login.dto"
import { IToken, ITokenPayload } from "./interfaces/token.interface"

@Injectable()
export class AuthService {
  EXPIRE_DAY = 3
  REFRESH_TOKEN = "refreshToken"
  LOGIN_DATE_EXPIRE = new Date(new Date().setDate(new Date().getDate() + 28))

  constructor(
    private readonly userServise: UserService,
    private readonly jwtServise: JwtService,
    private readonly postgresConfigService: DatabaseConfigService,
    private readonly mailerService: MailerService,
    private readonly confirmationService: ConfirmationService
  ) {}

  async login(dto: LoginDto, res: Response): Promise<ICodePayload | ITokenPayload> {
    const user = await this.validateUser(dto)

    if (user.email === dto.email) {
      this.sendVerificationCode(user)
    }

    if (user.name === dto.name) {
      const user = await this.validateUser(dto)
      const { accessToken, refreshToken } = this.issueTokens(user.id)

      this.addRefreshToken(res, refreshToken)

      return { user, accessToken }
    }
  }
  async register(dto: RegisterDto, res: Response): Promise<ITokenPayload> {
    const { email, name, password } = dto

    const oldUser = await this.userServise.findByEmail(email)
    if (oldUser) throw new ConflictException("User with this email already exists")

    const user = await this.userServise.create({ email, password: await hash(password), name })

    const { accessToken, refreshToken } = this.issueTokens(user.id)

    this.addRefreshToken(res, refreshToken)

    return { user, accessToken }
  }

  async validateUser(dto: LoginDto): Promise<User> {
    let user

    user = await this.userServise.findByEmail(dto.email)

    if (!user) user = await this.userServise.findByName(dto.email)

    if (!user) throw new NotFoundException("User not found!")

    if (dto.password) {
      const isValid = await verify(user.password, dto.password)

      if (!isValid) throw new UnauthorizedException("Invalid password")
    }

    return user
  }

  async sendVerificationCode(user: User): Promise<ICodePayload> {
    const { confirmationCode, confirmedAt } = await this.confirmationService.generateCode()

    await this.confirmationService.saveCode(user.id, confirmationCode, confirmedAt)

    await this.mailerService.sendMail({
      to: user.email,
      from: "auth.nest.next@gmail.com",
      subject: "Login Confirmation",
      html: getEmailHtml(confirmationCode)
    })

    return { confirmationCode, confirmedAt }
  }

  private issueTokens(userId: string): IToken {
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
    res.cookie(this.REFRESH_TOKEN, "", {
      httpOnly: true,
      domain: this.postgresConfigService.host,
      expires: new Date(0),
      secure: true,
      sameSite: "none"
    })
  }
}
