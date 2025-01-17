import { JwtConfigModule } from "@/config/jwt/config.module"
import { JwtConfigService } from "@/config/jwt/config.service"
import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"

@Module({
  imports: [
    JwtConfigModule,
    JwtModule.registerAsync({
      imports: [JwtConfigModule],
      inject: [JwtConfigService],
      useFactory: (jwtConfigService: JwtConfigService) => ({
        secret: jwtConfigService.secret
      })
    })
  ],
  exports: [JwtModule]
})
export class JwtProviderModule {}
