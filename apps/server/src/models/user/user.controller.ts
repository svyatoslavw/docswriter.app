import { Auth } from "@/common/decorators/requests/authorized-user.decorator"
import { CurrentUser } from "@/common/decorators/requests/current-user.decorator"
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

  @Get("profile")
  @Auth()
  @UseInterceptors(ClassSerializerInterceptor)
  async profile(@CurrentUser("id") id: string) {
    return this.userService.findById(id)
  }
}
