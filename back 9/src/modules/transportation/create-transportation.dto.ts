import { ApiProperty } from '@nestjs/swagger';

export class CreateTransportationDto {
  @ApiProperty({
    example: 'New York to Los Angeles',
    description: 'The route of the transportation',
  })
  location: string;

  @ApiProperty({
    example: 'Hello',
    description: 'Description of transportation',
  })
  description: string;

  @ApiProperty({ example: 100, description: 'The price of the transportation' })
  price: number;

  @ApiProperty({
    example: 10,
    description: 'Amount of time needed for getting to location',
  })
  duration: number;
}
