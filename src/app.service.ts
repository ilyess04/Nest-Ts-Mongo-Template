import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World, Nest.js template app using Typescript && MongoDB !';
  }
}
