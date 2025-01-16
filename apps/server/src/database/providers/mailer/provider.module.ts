import { MailerConfigModule } from "@/config/mailer/config.module"
import { MailerConfigService } from "@/config/mailer/config.service"
import { MailerModule } from "@nestjs-modules/mailer"
import { Module } from "@nestjs/common"

@Module({
  imports: [
    MailerConfigModule,
    MailerModule.forRootAsync({
      imports: [MailerConfigModule],
      inject: [MailerConfigService],
      useFactory: (mailerConfigService: MailerConfigService) => ({
        transport: {
          host: mailerConfigService.host,
          auth: {
            user: mailerConfigService.user,
            pass: mailerConfigService.password
          }
        }
      })
    })
  ],
  exports: [MailerModule]
})
export class MailerProviderModule {}
