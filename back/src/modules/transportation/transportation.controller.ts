import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { TransportationService } from './transportation.service';
import { TransportationEntity } from './transportation.entity';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTransportationDto } from './create-transportation.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

@ApiTags('transportation')
@Controller('transportation')
export class TransportationController {
  constructor(private readonly transportationService: TransportationService) {}

  @Get()
  @ApiOperation({ summary: 'Get all transportation records' })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Search term for filtering records',
  })
  @ApiQuery({ name: 'sort', required: false, description: 'Sorting options' })
  @ApiQuery({
    name: 'min_duration',
    required: false,
    description: 'Minimum duration filter',
  })
  @ApiQuery({
    name: 'max_duration',
    required: false,
    description: 'Maximum duration filter',
  })
  @ApiQuery({
    name: 'min_price',
    required: false,
    description: 'Minimum price filter',
  })
  @ApiQuery({
    name: 'max_price',
    required: false,
    description: 'Maximum price filter',
  })
  @ApiQuery({
    name: 'page_amount',
    required: false,
    description: 'Page number for pagination',
  })
  @ApiQuery({
    name: 'item_on_page',
    required: false,
    description: 'Number of items per page for pagination',
  })
  findAll(
    @Query('search') search?: string,
    @Query('sort') sort?: string,
    @Query('min_duration') min_duration?: number | null,
    @Query('max_duration') max_duration?: number | null,
    @Query('min_price') min_price?: number | null,
    @Query('max_price') max_price?: number | null,
    @Query('page_amount') page_amount?: number,
    @Query('item_on_page') item_on_page?: number,
  ): Promise<TransportationEntity[]> {
    return this.transportationService.findAll(
      search,
      sort,
      min_duration,
      max_duration,
      min_price,
      max_price,
      page_amount,
      item_on_page,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a transportation record by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the transportation record' })
  findOne(@Param('id') id: number): Promise<TransportationEntity | null> {
    return this.transportationService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new transportation record' })
  @ApiBody({ type: CreateTransportationDto })
  async create(@Body() transportation: CreateTransportationDto): Promise<void> {
    try {
      await this.transportationService.create(transportation);
    } catch (error) {
      console.error('Error creating transportation record:', error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a transportation record by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the transportation record' })
  @ApiBody({ type: CreateTransportationDto })
  update(
    @Param('id') id: number,
    @Body() newTransportation: Partial<CreateTransportationDto>,
  ): Promise<void> {
    return this.transportationService.update(id, newTransportation);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a transportation record by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the transportation record' })
  remove(@Param('id') id: number): Promise<void> {
    return this.transportationService.remove(id);
  }

  @Post('sum-prices')
  @ApiOperation({
    summary: 'Sum the prices of transportation records by their IDs',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: { ids: { type: 'array', items: { type: 'number' } } },
    },
  })
  sumPricesByIds(@Body('ids') ids: number[]): Promise<number> {
    return this.transportationService.sumPricesByIds(ids);
  }
}
