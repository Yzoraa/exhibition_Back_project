import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {} // service 가져와 controller에서 씀

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
