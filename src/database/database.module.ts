import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from '../config/database/database-config.interface';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseConfig = configService.get<DatabaseConfig>('database');
        return {
          ...databaseConfig,
          type: 'postgres',
          entities: [__dirname + '/../**/*.entity.ts'],
          autoLoadEntities: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
