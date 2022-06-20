import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigTokens } from '../config/config-tokens.enum';
import { TelegramGuard } from './guards/telegram.guard';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get(`${ConfigTokens.JWT}.secret`),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, TelegramGuard],
})
export class AuthModule {}
