import { User } from "@/models/user/entities/user.entity"
import { UserService } from "@/models/user/user.service"
import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ConfirmationService } from "./confirmation.service"

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [ConfirmationService, UserService]
})
export class ConfirmationModule {}
