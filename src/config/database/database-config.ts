import { registerAs } from '@nestjs/config';
import { DatabaseConfig } from './database-config.interface';
import { ConfigTokens } from '../config-tokens.enum';

export const databaseConfig = registerAs(
  ConfigTokens.DATABASE,
  (): DatabaseConfig => ({
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    password: process.env.POSTGRES_PASSWORD,
    port: +process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    synchronize: !!process.env.POSTGRES_SYNCHRONIZE,
    autoLoadEntities: true,
    entities: [__dirname + '/../**/*.entity.ts'],
  }),
);
