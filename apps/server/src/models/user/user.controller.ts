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
  getAll(): Promise<UserEntity[]> {
    return this.userService.findAll()
  }
}
