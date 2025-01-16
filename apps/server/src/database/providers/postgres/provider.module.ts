import { Module } from "@nestjs/common"
import { TypeOrmModule, TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm"
import { DatabaseConfigModule } from "src/config/database/postgres/config.module"
import { DatabaseConfigService } from "src/config/database/postgres/config.service"

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfigModule],
      useFactory: async (postgresConfigService: DatabaseConfigService) =>
        ({
          type: "postgres",
          host: postgresConfigService.host,
          port: postgresConfigService.port,
          username: postgresConfigService.username,
          password: postgresConfigService.password,
          database: postgresConfigService.database,
          entities: ["dist/**/*.entity{.ts,.js}"],
          migrations: ["dist/database/migrations/*{.ts,.js}"],
          autoLoadEntities: true,
          synchronize: true
        }) as TypeOrmModuleOptions,
      inject: [DatabaseConfigService]
    } as TypeOrmModuleAsyncOptions)
  ]
})
export class PostgresDatabaseProviderModule {}
