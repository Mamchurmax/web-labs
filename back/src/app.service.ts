import { Injectable } from '@nestjs/common';


@Injectable()
export class AppService {

  Pong(): string {
    return 'Pong';
  }

}