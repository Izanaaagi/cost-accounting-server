import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './config/database/database-config';
import { serverConfig } from './config/server/server.config';
import { DatabaseModule } from './database/database.module';
import { telegramConfig } from './config/telegram/telegram.config';
import { jwtConfig } from './config/jwt/jwt.config';
import { AuthModule } from './authentication/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, serverConfig, telegramConfig, jwtConfig],
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
