import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
/**
 * The database configuration service.
 *
 * @class
 */
@Injectable()
export class JwtConfigService {
  constructor(private configService: ConfigService) {}

  get secret(): string {
    return this.configService.get<string>("jwt.secret")
  }

  get expiresIn(): string {
    return this.configService.get<string>("jwt.expiresIn")
  }
}
