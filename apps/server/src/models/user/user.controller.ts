import { Auth } from "@/common/decorators/requests/authorized-user.decorator"
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  SerializeOptions,
  UseInterceptors
} from "@nestjs/common"
import { extendedUserGroupsForSerializing, UserEntity } from "./serializers/user.serializer"
import { UserService } from "./user.service"

@Controller("users")
@SerializeOptions({
  groups: extendedUserGroupsForSerializing
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @Auth()
  getAll(): Promise<UserEntity[]> {
    return this.userService.findAll()
  }
}
