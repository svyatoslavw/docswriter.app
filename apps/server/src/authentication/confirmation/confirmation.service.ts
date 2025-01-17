import { UserService } from "@/models/user/user.service"
import { Injectable } from "@nestjs/common"

@Injectable()
export class ConfirmationService {
  constructor(private readonly userService: UserService) {}

  async generateCode(): Promise<ICodePayload> {
    const confirmationCode = Math.floor(100000 + Math.random() * 900000).toString()

    const confirmedAt = new Date(Date.now() + 5 * 60000)

    return { confirmationCode, confirmedAt }
  }

  async saveCode(userId: string, confirmationCode: string, confirmedAt: Date) {
    await this.userService.update(userId, { confirmationCode, confirmedAt })
  }

  async getCode(userId: string): Promise<ICodePayload | null> {
    const user = await this.userService.findById(userId)

    if (user && user.code && user.codeExpiration > new Date())
      return { confirmationCode: user.confirmationCode, confirmedAt: user.confirmedAt }

    return null
  }

  async deleteCode(userId: string) {
    await this.userService.update(userId, { confirmationCode: null, confirmedAt: null })
  }
}
