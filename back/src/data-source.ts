import { DataSource } from 'typeorm';
import { TransportationEntity } from './modules/transportation/transportation.entity';
import { join } from 'path';
import { CartEntity } from './modules/cart/cart.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'axdupo90',
  database: 'weblab',
  entities: [TransportationEntity, CartEntity],
  migrations: [join(__dirname, 'migrations', '*.ts')],
  synchronize: false,
});
