import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Transportation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  @ApiProperty({ example: 'New York to Los Angeles', description: 'The route of the transportation' })
  from_to: string;

  @Column({ type: 'varchar' })
  @ApiProperty({ example: 'Hello', description: 'Description of transportation' })
  description: string;

  @Column('decimal')
  @ApiProperty({ example: 100.50, description: 'The price of the transportation' })
  price: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  last_updated: Date;
}