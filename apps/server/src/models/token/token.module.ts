import { JwtProviderModule } from "@/authentication/providers/jwt.provider"
import { DatabaseConfigModule } from "@/config/database/postgres/config.module"
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Token } from "./entities/token.entity"
import { TokenController } from "./token.controller"
import { TokenService } from "./token.service"

@Module({
  imports: [DatabaseConfigModule, JwtProviderModule, TypeOrmModule.forFeature([Token])],
  controllers: [TokenController],
  exports: [TokenService],
  providers: [TokenService]
})
export class TokenModule {}
