
import { Controller} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {

    constructor(
        private readonly notificationService: NotificationService,
    ) { };

  

    @MessagePattern('movie.add')
    async movieAdd(payload: any): Promise<void> {
        return this.notificationService.movieAdd(payload);
    }


    @MessagePattern('notification.add.comment')
    async addComment(payload: any): Promise<string> {
        return this.notificationService.addComment(payload);
    }

}
