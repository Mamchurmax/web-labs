import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transportation } from './modules/transportation/transportation.entity';
import { TransportationController } from './modules/transportation/transportation.controller';
import { TransportationService } from './modules/transportation/transportation.service';
import { TransportationModule } from './modules/transportation/transportation.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'axdupo90',
    database: 'weblab',
    entities: [Transportation],
    synchronize: false,
  }),
    TypeOrmModule.forFeature([Transportation]),
    TransportationModule,],
  controllers: [AppController, TransportationController],
  providers: [AppService, TransportationService],
})
export class AppModule {}
