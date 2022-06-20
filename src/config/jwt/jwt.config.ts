import { registerAs } from '@nestjs/config';
import { ConfigTokens } from '../config-tokens.enum';
import { JwtConfig } from './jwt-config.interface';

export const jwtConfig = registerAs(
  ConfigTokens.JWT,
  (): JwtConfig => ({ secret: process.env.JWT_SECRET }),
);
