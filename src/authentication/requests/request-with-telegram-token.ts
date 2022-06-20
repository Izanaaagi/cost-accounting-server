import { Request } from 'express';
import { IncomingHttpHeaders } from 'http2';

export interface RequestWithTelegramToken extends Request {
  headers: IncomingHttpHeaders & {
    'telegram-token': string;
  };
}
