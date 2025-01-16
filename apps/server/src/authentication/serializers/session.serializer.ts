import { User } from "@/models/user/entities/user.entity"
import { UserService } from "@/models/user/user.service"
import { PassportSerializer } from "@nestjs/passport"

export class SessionSerializer extends PassportSerializer {
  constructor(private userService: UserService) {
    super()
  }
  serializeUser(user: User, done: Function) {
    done(null, user)
  }

  deserializeUser(payload: unknown & { id: string }, done: Function) {
    const user = this.userService.findById(payload.id)
    return user ? done(null, user) : done(null, null)
  }
}
