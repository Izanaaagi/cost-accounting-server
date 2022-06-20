import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { TelegramConfig } from '../../config/telegram/telegram-config.interface';
import { ConfigTokens } from '../../config/config-tokens.enum';
import { RequestWithTelegramToken } from '../requests/request-with-telegram-token';

@Injectable()
export class TelegramGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { telegramToken } = this.configService.get<TelegramConfig>(
      ConfigTokens.TELEGRAM,
    );

    const request: RequestWithTelegramToken = context
      .switchToHttp()
      .getRequest();

    return request.headers['telegram-token'] === telegramToken;
  }
}
