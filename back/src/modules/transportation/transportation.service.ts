import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, In, Like, Repository } from 'typeorm';
import { Transportation } from './transportation.entity';
import { CreateTransportationDto } from './create-transportation.dto';

@Injectable()
export class TransportationService {
  constructor(
    @InjectRepository(Transportation)
    private transportationRepository: Repository<Transportation>,
  ) {}

  findAll(search?: string, sort?: string): Promise<Transportation[]> {
    const options: FindManyOptions<Transportation> = {};

    if (search) {
      options.where = [
        { from_to: Like(`%${search}%`) },
      ];
    }

    if (sort) {
      const [field, direction] = sort.split(':');
      switch (field) {
        case 'from_to':
        case 'price':
        case 'last_updated':
          options.order = { [field]: direction.toUpperCase() as 'ASC' | 'DESC' };
          break;
        default:
          throw new Error(`Invalid sort field: ${field}`);
      }
    }

    return this.transportationRepository.find(options);
  }

  findOne(id: number): Promise<Transportation | null> {
    return this.transportationRepository.findOneBy({ id });
  }

  findOneByName(from_to: string): Promise<Transportation> {
    return this.transportationRepository.findOneBy({ from_to });
  }

  async remove(id: number): Promise<void> {
    const existingTransportation = await this.transportationRepository.findOneBy({ id });
    if (!existingTransportation) {
      throw new HttpException('Transportation record not found', HttpStatus.NOT_FOUND);
    }
    await this.transportationRepository.delete(id);
  }

  async create(transportationDto: CreateTransportationDto): Promise<void> {
    const existingTransportation = await this.findOneByName(transportationDto.from_to);
    if (existingTransportation) {
      throw new HttpException('This route exists', HttpStatus.BAD_REQUEST);
    }    const newTransportation = this.transportationRepository.create(transportationDto);
    newTransportation.last_updated = new Date();
    await this.transportationRepository.save(newTransportation);
  }

  async update(id: number, newTransportation: Partial<CreateTransportationDto>,): Promise<void> {
    const existingTransportation = await this.transportationRepository.findOneBy({ id });
    if (!existingTransportation) {
      throw new HttpException('Transportation record not found', HttpStatus.NOT_FOUND);
    }

    const updatedTransportation = {
      ...existingTransportation,
      ...newTransportation,
      last_updated: new Date(),
    };
    await this.transportationRepository.save(updatedTransportation);
  }

  async sumPricesByIds(ids: number[]): Promise<number> {
    const transportations = await this.transportationRepository.findBy({ id: In(ids) });
    return transportations.reduce((sum, transportation) => sum + Number(transportation.price), 0);
  }
}

