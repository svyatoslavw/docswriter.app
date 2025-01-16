import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
/**
 * The database configuration service.
 *
 * @class
 */
@Injectable()
export class MailerConfigService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>("mailer.host")
  }

  get user(): string {
    return this.configService.get<string>("mailer.user")
  }

  get password(): string {
    return this.configService.get<string>("mailer.password")
  }
}
