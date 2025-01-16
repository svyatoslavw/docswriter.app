import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { JwtService } from "@nestjs/jwt"
import { JwtConfigService } from "./config.service"
import configuration from "./configuration" // Импортируем конфигурацию

@Module({
  imports: [ConfigModule.forRoot({ load: [configuration] })], // Подключаем конфигурацию
  providers: [
    {
      provide: JwtService,
      useFactory: (configService: JwtConfigService) => {
        return new JwtService({ secret: configService.secret })
      },
      inject: [ConfigService]
    },
    JwtConfigService
  ],
  exports: [JwtService, JwtConfigService]
})
export class JwtConfigModule {}
