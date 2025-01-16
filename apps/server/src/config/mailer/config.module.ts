import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { MailerConfigService } from "./config.service"
import configuration from "./configuration"

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration]
    })
  ],
  providers: [MailerConfigService, ConfigService],
  exports: [MailerConfigService, ConfigService]
})
export class MailerConfigModule {}
