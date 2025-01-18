import { Module } from "@nestjs/common"

import { MailModule } from "@/common/mails/mail.module"
import { Token } from "@/models/token/entities/token.entity"
import { TokenModule } from "@/models/token/token.module"
import { User } from "@/models/user/entities/user.entity"
import { UserModule } from "@/models/user/user.module"
import { TypeOrmModule } from "@nestjs/typeorm"
import { EmailConfirmationService } from "./email-confirmation.service"

@Module({
  imports: [MailModule, TokenModule, UserModule, TypeOrmModule.forFeature([User, Token])],
  providers: [EmailConfirmationService],
  exports: [EmailConfirmationService]
})
export class EmailConfirmationModule {}
