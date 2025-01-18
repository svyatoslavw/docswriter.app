import { DatabaseConfigModule } from "@/config/database/postgres/config.module"
import { MailerProviderModule } from "@/database/providers/mailer/provider.module"
import { User } from "@/models/user/entities/user.entity"
import { UserService } from "@/models/user/user.service"
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { JwtProviderModule } from "./providers/jwt.provider"
import { SessionService } from "./session/session.service"
import { JwtStrategy } from "./strategies/jwt.strategy"
import { ConfirmationService } from "./token/token.service"

@Module({
  imports: [
    JwtProviderModule,
    TypeOrmModule.forFeature([User]),
    DatabaseConfigModule,
    MailerProviderModule
  ],
  controllers: [AuthController],
  providers: [AuthService, ConfirmationService, UserService, JwtStrategy, SessionService]
})
export class AuthModule {}
