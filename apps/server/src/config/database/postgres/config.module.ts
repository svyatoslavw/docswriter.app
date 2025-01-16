import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { DatabaseConfigService } from "./config.service"
import configuration from "./configuration"

/**
 * The module that provides the configuration for the database.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration]
    })
  ],
  providers: [ConfigService, DatabaseConfigService],
  exports: [ConfigService, DatabaseConfigService]
})
export class DatabaseConfigModule {}
