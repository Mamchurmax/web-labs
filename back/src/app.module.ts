import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransportationEntity } from './modules/transportation/transportation.entity';
import { TransportationModule } from './modules/transportation/transportation.module';
import { CartEntity } from './modules/cart/cart.entity';
import { CartModule } from './modules/cart/cart.module';
import { AppDataSource } from './data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    TypeOrmModule.forFeature([TransportationEntity, CartEntity]),
    TransportationModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
