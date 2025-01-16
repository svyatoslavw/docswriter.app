import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig({ path: '.env' });

const config: DataSourceOptions = {
    type: 'postgres',
    host: `${process.env.DATABASE_HOST}`,
    port: Number(process.env.DATABASE_PORT),
    username: `${process.env.DATABASE_USERNAME}`,
    password: `${process.env.DATABASE_PASSWORD}`,
    database: `${process.env.DATABASE_NAME}`,
    entities: ["dist/**/*.entity{.ts,.js}"],
    migrations: ["dist/database/migrations/*{.ts,.js}"],
    synchronize: false
} 

export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config);