import { User } from "@/models/user/entities/user.entity"
import { UserService } from "@/models/user/user.service"
import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get("JWT_SECRET"),
      ignoreExpiration: true,
      passReqToCallback: true
    })
  }

  async validate({ id }: Pick<User, "id">) {
    return this.userService.findById(id)
  }
}
