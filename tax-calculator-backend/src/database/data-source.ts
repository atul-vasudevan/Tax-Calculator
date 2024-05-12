import * as dotenv from 'dotenv';
dotenv.config();
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'atul',
  password: '1234',
  database: 'develop',
  synchronize: true,
  dropSchema: false,
  logging: true,
  logger: 'file',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*.ts'],
//   migrationsTableName: 'migration_table',
});
