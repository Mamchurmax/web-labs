import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransportationService } from './transportation.service';
import { TransportationController } from './transportation.controller';
import { TransportationEntity } from './transportation.entity';
import { CartEntity } from '../cart/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransportationEntity, CartEntity])],
  providers: [TransportationService],
  controllers: [TransportationController],
})
export class TransportationModule {}
