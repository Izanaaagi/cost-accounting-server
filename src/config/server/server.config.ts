import { registerAs } from '@nestjs/config';
import { ServerConfig } from './server-config.interface';
import { ConfigTokens } from '../config-tokens.enum';

export const serverConfig = registerAs(
  ConfigTokens.SERVER,
  (): ServerConfig => ({ port: process.env.PORT }),
);
