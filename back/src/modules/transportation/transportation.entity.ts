import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { CartEntity } from '../cart/cart.entity';

@Entity()
export class TransportationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  @ApiProperty({
    example: 'New York to Los Angeles',
    description: 'The route of the transportation',
  })
  location: string;

  @Column({ type: 'varchar' })
  @ApiProperty({
    example: 'Hello',
    description: 'Description of transportation',
  })
  description: string;

  @Column('decimal')
  @ApiProperty({
    example: 100.5,
    description: 'The price of the transportation',
  })
  price: number;

  @Column('integer')
  @ApiProperty({
    example: 10,
    description: 'Amount of time needed for getting to location',
  })
  duration: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  last_updated: Date;

  @OneToMany(() => CartEntity, (cart) => cart.transportation)
  carts: CartEntity[];
}
