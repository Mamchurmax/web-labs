import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './cart.entity';
import { CartController } from './cart.controller';
import { TransportationEntity } from '../transportation/transportation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity, TransportationEntity])],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
