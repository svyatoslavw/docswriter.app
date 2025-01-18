import { MailService } from "@/common/mails/mail.service"
import { DatabaseConfigModule } from "@/config/database/postgres/config.module"
import { MailerProviderModule } from "@/database/providers/mailer/provider.module"
import { Token } from "@/models/token/entities/token.entity"
import { TokenService } from "@/models/token/token.service"
import { User } from "@/models/user/entities/user.entity"
import { UserService } from "@/models/user/user.service"
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { EmailConfirmationModule } from "./email-confirmation/email-confirmation.module"
import { JwtProviderModule } from "./providers/jwt.provider"
import { JwtStrategy } from "./strategies/jwt.strategy"

@Module({
  imports: [
    JwtProviderModule,
    TypeOrmModule.forFeature([User, Token]),
    DatabaseConfigModule,
    MailerProviderModule,
    EmailConfirmationModule
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService, MailService, UserService, JwtStrategy]
})
export class AuthModule {}
