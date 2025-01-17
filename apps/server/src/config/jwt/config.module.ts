import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { JwtConfigService } from "./config.service";
import configuration from "./configuration"; // Импортируем конфигурацию

@Module({
  imports: [ConfigModule.forRoot({ load: [configuration] })], // Подключаем конфигурацию
  providers: [JwtService, JwtConfigService],
  exports: [JwtService, JwtConfigService]
})
export class JwtConfigModule {}
