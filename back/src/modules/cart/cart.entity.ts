import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { TransportationEntity } from '../transportation/transportation.entity';

@Entity()
export class CartEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the cart item',
  })
  id: number;

  @Column('integer')
  @ApiProperty({ example: 1, description: 'The amount of items in the cart' })
  amount: number;

  @Column('varchar')
  @ApiProperty({
    example: 'example',
    description: 'The type of items in the cart',
  })
  type: string;

  @ManyToOne(
    () => TransportationEntity,
    (transportation) => transportation.carts,
  )
  @ApiProperty({
    type: () => TransportationEntity,
    description: 'The transportation associated with the cart item',
  })
  transportation: TransportationEntity;
}
