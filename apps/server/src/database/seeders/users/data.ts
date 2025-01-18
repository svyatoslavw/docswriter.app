import { IUser } from "@/models/user/interfaces/user.interface"
import { faker } from "@faker-js/faker"

export const users: IUser[] = Array.from({ length: 20 }, () => ({
  name: faker.person.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password({ length: 8 }),
  avatarUrl: faker.image.avatar(),
  projects: [],
  isTwoFactorEnabled: false,
  isVerified: false
}))
