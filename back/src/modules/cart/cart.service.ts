import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './cart.entity';
import { Repository } from 'typeorm';
import { TransportationEntity } from '../transportation/transportation.entity';
import { CreateCartDto } from './create.cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    @InjectRepository(TransportationEntity)
    private readonly transportationRepository: Repository<TransportationEntity>,
  ) {}

  async findAll(): Promise<CartEntity[]> {
    return this.cartRepository.find({ relations: ['transportation'] });
  }

  async create(
    amount: number,
    type: string,
    transportationId: number,
  ): Promise<CartEntity> {
    const transportation = await this.transportationRepository.findOne({
      where: { id: transportationId },
    });
    if (!transportation) {
      throw new NotFoundException('Transportation not found');
    }

    const existingCart = await this.cartRepository.findOne({
      where: {
        type: type,
        transportation: transportation,
      },
    });

    if (existingCart) {
      existingCart.amount += amount;
      return await this.cartRepository.save(existingCart);
    } else {
      const newCart = this.cartRepository.create({
        amount: amount,
        type: type,
        transportation: transportation,
      });
      return await this.cartRepository.save(newCart);
    }
  }

  async remove(id: number): Promise<void> {
    const cartEntity = await this.cartRepository.findOne({
      where: { id: id },
    });
    if (cartEntity) {
      await this.cartRepository.delete(id);
    }
  }

  async update(
    id: number,
    amount: number,
    type: string,
    transportationId: number,
  ): Promise<void> {
    const cartEntity = await this.cartRepository.findOne({
      where: { id: id },
    });
    if (!cartEntity) {
      throw new NotFoundException('Cart not found');
    }

    const transportation = await this.transportationRepository.findOne({
      where: { id: transportationId },
    });
    if (!transportation) {
      throw new NotFoundException('Transportation not found');
    }

    cartEntity.amount = amount;
    cartEntity.type = type;
    cartEntity.transportation = transportation;

    await this.cartRepository.save(cartEntity);
  }
}
