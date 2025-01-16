import { PostgresDatabaseProviderModule } from "@/database/providers/postgres/provider.module"
import { Module } from "@nestjs/common"
import { PassportModule } from "@nestjs/passport"
import { AuthModule } from "./authentication/auth.module"
import { UserModule } from "./models/user/user.module"

@Module({
  imports: [
    PostgresDatabaseProviderModule,
    UserModule,
    AuthModule,
    PassportModule.register({ session: true })
  ]
})
export class AppModule {}
