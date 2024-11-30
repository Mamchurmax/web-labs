import { TransportationEntity } from '../transportation/transportation.entity';

export class CreateCartDto {
  transportation: TransportationEntity;
  amount: number;
  type: string;
}
