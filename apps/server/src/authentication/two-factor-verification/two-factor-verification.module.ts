import { Module } from "@nestjs/common"

import { MailModule } from "@/common/mails/mail.module"
import { Token } from "@/models/token/entities/token.entity"
import { TokenModule } from "@/models/token/token.module"
import { User } from "@/models/user/entities/user.entity"
import { UserModule } from "@/models/user/user.module"
import { TypeOrmModule } from "@nestjs/typeorm"
import { TwoFactorVerificationService } from "./two-factor-verification.service"

@Module({
  imports: [MailModule, TokenModule, UserModule, TypeOrmModule.forFeature([User, Token])],
  providers: [TwoFactorVerificationService],
  exports: [TwoFactorVerificationService]
})
export class TwoFactorVerificationModule {}
