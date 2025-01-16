import { Injectable, Logger } from "@nestjs/common"
import { UsersSeederService } from "./users/users.service"

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly usersSeederService: UsersSeederService
  ) {}
  async seed() {
    await this.users()
      .then((completed) => {
        this.logger.debug("Successfuly completed seeding users...")
        Promise.resolve(completed)
      })
      .catch((error) => {
        this.logger.error("Failed seeding users...")
        Promise.reject(error)
      })
  }
  async users() {
    return await Promise.all(this.usersSeederService.create())
      .then((createdUsers) => {
        // Can also use this.logger.verbose('...');
        this.logger.debug(
          "Length of created users : " +
            // Remove all null values and return only created languages.
            createdUsers.filter((nullValueOrCreatedUser) => nullValueOrCreatedUser).length
        )
        return Promise.resolve(true)
      })
      .catch((error) => Promise.reject(error))
  }
}
