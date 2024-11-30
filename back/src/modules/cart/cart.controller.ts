import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CartService } from './cart.service';
import { CartEntity } from './cart.entity';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @ApiOperation({ summary: 'Get all cart items' })
  @ApiResponse({
    status: 200,
    description: 'Return all cart items',
    type: [CartEntity],
  })
  async findAll(): Promise<CartEntity[]> {
    return this.cartService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new cart item' })
  @ApiBody({
    schema: { example: { amount: 1, type: 'example', transportationId: 1 } },
  })
  @ApiResponse({
    status: 201,
    description: 'The cart item has been successfully created.',
    type: CartEntity,
  })
  async create(
    @Body('amount') amount: number,
    @Body('type') type: string,
    @Body('transportationId', ParseIntPipe) transportationId: number,
  ): Promise<CartEntity> {
    return this.cartService.create(amount, type, transportationId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a cart item' })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'ID of the cart item to update',
  })
  @ApiBody({
    schema: { example: { amount: 1, type: 'example', transportationId: 1 } },
  })
  @ApiResponse({
    status: 200,
    description: 'The cart item has been successfully updated.',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body('amount') amount: number,
    @Body('type') type: string,
    @Body('transportationId', ParseIntPipe) transportationId: number,
  ): Promise<void> {
    return this.cartService.update(id, amount, type, transportationId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a cart item' })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'ID of the cart item to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'The cart item has been successfully deleted.',
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.cartService.remove(id);
  }
}
