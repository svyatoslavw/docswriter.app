import { Module } from "@nestjs/common"

import { MailerProviderModule } from "@/database/providers/mailer/provider.module"
import { MailService } from "./mail.service"

@Module({
  imports: [MailerProviderModule],
  providers: [MailService]
})
export class MailModule {}
