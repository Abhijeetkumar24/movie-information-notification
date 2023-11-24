
import { Controller} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MailerService } from '@nestjs-modules/mailer';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {

    constructor(
        private readonly notificationService: NotificationService,
    ) { };

    // @GrpcMethod('NotificationService', 'AddMovie')
    // findOne(data: AddMovieRequest, metadata: Metadata, call: ServerUnaryCall<any, any>): AddMovieResponse {
    //     console.log("hii notifiaction")
    //     const items = [
    //         { id: 1, name: 'John' },
    //         { id: 2, name: 'Doe' },
    //     ];
    //     // return items.find(({ id }) => id === data.id);
    //     return { msg: data.msg, status: 'success' };
    // }


    @MessagePattern('movie.add')
    async movieAdd(payload: any): Promise<void> {
        return this.notificationService.movieAdd(payload);
    }


    @MessagePattern('notification.add.comment')
    async addComment(payload: any): Promise<string> {
        return this.notificationService.addComment(payload);
    }

}
