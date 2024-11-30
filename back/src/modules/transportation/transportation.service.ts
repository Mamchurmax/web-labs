import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  FindManyOptions,
  FindOptionsWhere,
  ILike,
  In,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { TransportationEntity } from './transportation.entity';
import { CreateTransportationDto } from './create-transportation.dto';

@Injectable()
export class TransportationService {
  constructor(
    @InjectRepository(TransportationEntity)
    private transportationRepository: Repository<TransportationEntity>,
  ) {}

  async findAll(
    search?: string,
    sort?: string,
    min_duration?: number | null,
    max_duration?: number | null,
    min_price?: number | null,
    max_price?: number | null,
    page_amount?: number,
    item_on_page?: number,
  ): Promise<TransportationEntity[]> {
    const options: FindOptionsWhere<TransportationEntity> = {};
    if (!min_duration) {
      min_duration = undefined;
    }
    if (!max_duration) {
      max_duration = undefined;
    }
    if (!min_price) {
      min_price = undefined;
    }
    if (!max_price) {
      max_price = undefined;
    }
    if (search) {
      options.location = ILike(`%${search.trim()}%`);
    }

    if (min_duration !== undefined && max_duration !== undefined) {
      options.duration = Between(min_duration, max_duration);
    } else {
      if (min_duration !== undefined) {
        options.duration = MoreThanOrEqual(min_duration);
      }
      if (max_duration !== undefined) {
        options.duration = LessThanOrEqual(max_duration);
      }
    }

    if (min_price !== undefined && max_price !== undefined) {
      options.price = Between(min_price, max_price);
    } else {
      if (min_price !== undefined) {
        options.price = MoreThanOrEqual(min_price);
      }
      if (max_price !== undefined) {
        options.price = LessThanOrEqual(max_price);
      }
    }

    const findOptions: FindManyOptions<TransportationEntity> = {
      where: options,
    };

    if (sort) {
      const [field, direction] = sort.split(':');
      switch (field) {
        case 'location':
        case 'price':
        case 'duration':
          findOptions.order = {
            [field]: direction.toUpperCase() as 'ASC' | 'DESC',
          };
          break;
        default:
          throw new Error(`Invalid sort field: ${field}`);
      }
    }

    if (page_amount !== undefined && item_on_page !== undefined) {
      findOptions.skip = (page_amount - 1) * item_on_page;
      findOptions.take = item_on_page;
    }

    return this.transportationRepository.find(findOptions);
  }

  findOne(id: number): Promise<TransportationEntity | null> {
    return this.transportationRepository.findOneBy({ id });
  }

  findOneByName(location: string): Promise<TransportationEntity> {
    return this.transportationRepository.findOneBy({ location });
  }

  async remove(id: number): Promise<void> {
    const existingTransportation =
      await this.transportationRepository.findOneBy({ id });
    if (!existingTransportation) {
      throw new HttpException(
        'Transportation record not found',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.transportationRepository.delete(id);
  }

  async create(transportationDto: CreateTransportationDto): Promise<void> {
    const existingTransportation = await this.findOneByName(
      transportationDto.location,
    );
    if (existingTransportation) {
      throw new HttpException('This route exists', HttpStatus.BAD_REQUEST);
    }
    const newTransportation =
      this.transportationRepository.create(transportationDto);
    newTransportation.last_updated = new Date();
    await this.transportationRepository.save(newTransportation);
  }

  async update(
    id: number,
    newTransportation: Partial<CreateTransportationDto>,
  ): Promise<void> {
    const existingTransportation =
      await this.transportationRepository.findOneBy({ id });
    if (!existingTransportation) {
      throw new HttpException(
        'Transportation record not found',
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedTransportation = {
      ...existingTransportation,
      ...newTransportation,
      last_updated: new Date(),
    };
    await this.transportationRepository.save(updatedTransportation);
  }

  async sumPricesByIds(ids: number[]): Promise<number> {
    const transportations = await this.transportationRepository.findBy({
      id: In(ids),
    });
    return transportations.reduce(
      (sum, transportation) => sum + Number(transportation.price),
      0,
    );
  }

}
