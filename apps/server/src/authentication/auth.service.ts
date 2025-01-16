import { DatabaseConfigService } from "@/config/database/postgres/config.service"
import { User } from "@/models/user/entities/user.entity"
import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { InjectRepository } from "@nestjs/typeorm"
import { verify } from "argon2"
import { Response } from "express"
import { Repository } from "typeorm"

@Injectable()
export class AuthService {
  EXPIRE_DAY = 3
  REFRESH_TOKEN = "refreshToken"
  LOGIN_DATE_EXPIRE = new Date(new Date().setDate(new Date().getDate() + 28))

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtServise: JwtService,
    private readonly postgresConfigService: DatabaseConfigService
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } })
    if (!user) throw new NotFoundException("User with this email does not exist!")

    if (!user.password) throw new UnauthorizedException(`Password is missing or invalid`)

    if (password) {
      const isValid = await verify(user.password, password)

      if (!isValid) throw new UnauthorizedException("Invalid password")
    }

    return user
  }

  async issueTokens(userId: string) {
    const data = { id: userId }

    const accessToken = this.jwtServise.sign(data, {
      expiresIn: "1d"
    })

    const refreshToken = this.jwtServise.sign(data, {
      expiresIn: "3d"
    })

    return { accessToken, refreshToken }
  }

  ddRefreshToken(res: Response, refreshToken: string) {
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
