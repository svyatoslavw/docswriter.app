import { Logger, Module } from "@nestjs/common"
import { PostgresDatabaseProviderModule } from "../providers/postgres/provider.module"
import { Seeder } from "./seeder"
import { UsersSeederModule } from "./users/users.module"

/**
 * Import and provide seeder classes.
 *
 * @module
 */
@Module({
  imports: [PostgresDatabaseProviderModule, UsersSeederModule],
  providers: [Logger, Seeder]
})
export class SeederModule {}
