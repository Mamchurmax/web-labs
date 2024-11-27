import { DataSource } from 'typeorm';
import { Transportation } from './modules/transportation/transportation.entity';
import { join } from 'path';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'axdupo90',
  database: 'weblab',
  entities: [Transportation],
  migrations: [join(__dirname, 'migrations', '*.ts')],
  synchronize: false,
});
