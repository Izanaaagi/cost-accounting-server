import { registerAs } from '@nestjs/config';
import { ConfigTokens } from '../config-tokens.enum';
import { TelegramConfig } from './telegram-config.interface';

export const telegramConfig = registerAs(
  ConfigTokens.TELEGRAM,
  (): TelegramConfig => ({
    telegramToken: process.env.TELEGRAM_ACCESS_API_TOKEN,
  }),
);
