import { PostgresDatabaseProviderModule } from "@/database/providers/postgres/provider.module"
import { Module } from "@nestjs/common"
import { PassportModule } from "@nestjs/passport"
import { AuthModule } from "./authentication/auth.module"
import { TokenModule } from "./models/token/token.module"
import { UserModule } from "./models/user/user.module"

@Module({
  imports: [
    PostgresDatabaseProviderModule,
    UserModule,
    AuthModule,
    PassportModule.register({ session: true }),
    TokenModule
  ]
})
export class AppModule {}
