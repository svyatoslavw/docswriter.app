import { Module } from "@nestjs/common"

import { MailModule } from "@/common/mails/mail.module"
import { TokenModule } from "@/models/token/token.module"
import { User } from "@/models/user/entities/user.entity"
import { TypeOrmModule } from "@nestjs/typeorm"
import { RecoveryPasswordService } from "./recovery-password.service"

@Module({
  imports: [MailModule, TokenModule, TypeOrmModule.forFeature([User])],
  providers: [RecoveryPasswordService]
})
export class RecoveryPasswordModule {}
