import { DatabaseConfigModule } from "@/config/database/postgres/config.module"
import { MailerProviderModule } from "@/database/providers/mailer/provider.module"
import { User } from "@/models/user/entities/user.entity"
import { UserService } from "@/models/user/user.service"
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { ConfirmationService } from "./confirmation/confirmation.service"
import { JwtProviderModule } from "./providers/jwt.provider"
import { SessionSerializer } from "./serializers/session.serializer"
import { JwtStrategy } from "./strategies/jwt.strategy"

@Module({
  imports: [
    JwtProviderModule,
    TypeOrmModule.forFeature([User]),
    DatabaseConfigModule,
    MailerProviderModule
  ],
  controllers: [AuthController],
  providers: [AuthService, ConfirmationService, UserService, JwtStrategy, SessionSerializer]
})
export class AuthModule {}
