import { BaseService } from "@/models/base/base.service"
import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { instanceToPlain, plainToInstance } from "class-transformer"
import { Repository } from "typeorm"
import { User } from "./entities/user.entity"
import { allUserGroupsForSerializing, UserEntity } from "./serializers/user.serializer"

@Injectable()
export class UserService extends BaseService<User, UserEntity> {
  TRANSFROM_OPTIONS = { groups: allUserGroupsForSerializing }

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
    super(userRepository)
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.all()
    return this.transformMany(users)
  }

  async findById(id: string): Promise<UserEntity> {
    const user = await this.get(id, [], true)
    return this.transform(user)
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.repository.findOne({ where: { email } })
    return this.transform(user)
  }

  async findByName(name: string): Promise<UserEntity> {
    const user = await this.repository.findOne({ where: { name } })
    return this.transform(user)
  }

  transform(model: User): UserEntity {
    return plainToInstance(
      UserEntity,
      instanceToPlain(model, this.TRANSFROM_OPTIONS),
      this.TRANSFROM_OPTIONS
    )
  }

  transformMany(models: User[]): UserEntity[] {
    return models.map((model) => this.transform(model))
  }
}
