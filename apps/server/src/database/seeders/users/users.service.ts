import { User } from "@/models/user/entities/user.entity"
import { IUser } from "@/models/user/interfaces/user.interface"
import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { users } from "./data"

/**
 * Service dealing with language based operations.
 *
 * @class
 */
@Injectable()
export class UsersSeederService {
  /**
   * Create an instance of class.
   *
   * @constructs
   *
   * @param {Repository<Language>} usersRepository
   */
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}
  /**
   * Seed all languages.
   *
   * @function
   */
  create(): Array<Promise<User>> {
    return users.map(async (user: IUser) => {
      return await this.usersRepository
        .findOne({ where: { email: user.email } })
        .then(async (dbUser) => {
          // We check if a language already exists.
          // If it does don't create a new one.
          if (dbUser) {
            return Promise.resolve(null)
          }
          return Promise.resolve(
            // or create(language).then(() => { ... });
            await this.usersRepository.save(user)
          )
        })
        .catch((error) => Promise.reject(error))
    })
  }
}
