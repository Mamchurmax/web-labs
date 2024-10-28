import { ApiProperty } from '@nestjs/swagger';

export class CreateTransportationDto {
  @ApiProperty({ example: 'New York to Los Angeles', description: 'The route of the transportation' })
  from_to: string;

  @ApiProperty({ example: 'Hello', description: 'Description of transportation' })
  description: string;

  @ApiProperty({ example: 100, description: 'The price of the transportation' })
  price: number;
}