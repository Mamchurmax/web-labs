import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransportationService } from './transportation.service';
import { TransportationController } from './transportation.controller';
import { Transportation } from './transportation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transportation])],
  providers: [TransportationService],
  controllers: [TransportationController],
})
export class TransportationModule {}
