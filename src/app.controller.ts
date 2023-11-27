import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable, from } from 'rxjs';
import { MessagePattern } from '@nestjs/microservices';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

}
