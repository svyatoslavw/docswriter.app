import { ModelEntity } from "@/models/base/base.serializer"
import { NotFoundException } from "@nestjs/common"
import { plainToInstance } from "class-transformer"
import { DeepPartial, DeleteResult, Repository } from "typeorm"
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity"

export class BaseService<T, K extends ModelEntity> {
  protected readonly repository: Repository<T>

  constructor(repository: Repository<T>) {
    this.repository = repository
  }

  async all(): Promise<T[]> {
    return await this.repository
      .find()
      .then((models) => Promise.resolve(models))
      .catch((error) => Promise.reject(error))
  }

  async get(id: string, relations: string[] = [], throwsException = false): Promise<K | null> {
    return await this.repository
      .findOne({
        where: { id } as any,
        relations
      })
      .then((entity) => {
        if (!entity && throwsException) {
          return Promise.reject(new NotFoundException("Model not found."))
        }

        return Promise.resolve(entity ? this.transform(entity) : null)
      })
      .catch((error) => Promise.reject(error))
  }
  async create(inputs: DeepPartial<T>, relations: string[] = []): Promise<K> {
    return this.repository
      .save(inputs)
      .then(async (entity) => await this.get((entity as any).id, relations))
      .catch((error) => Promise.reject(error))
  }
  async update(
    id: string,
    inputs: QueryDeepPartialEntity<T>,
    relations: string[] = []
  ): Promise<K> {
    return this.repository
      .update(id, inputs)
      .then(async () => await this.get(id, relations))
      .catch((error) => Promise.reject(error))
  }

  async delete(id: string): Promise<DeleteResult> {
    return this.repository.delete(id)
  }

  transform(model: T, transformOptions = {}): K {
    return plainToInstance(ModelEntity, model, transformOptions) as K
  }
  transformMany(models: T[], transformOptions = {}): K[] {
    return models.map((model) => this.transform(model, transformOptions))
  }
}
