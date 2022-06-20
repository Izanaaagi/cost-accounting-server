export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  synchronize: boolean;
  autoLoadEntities: boolean;
  entities: string[];
  logging: boolean;
}
