import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller, RequestTimeoutException } from '@nestjs/common';
import { EventPattern, GrpcMethod, MessagePattern } from '@nestjs/microservices';
import { MESSAGE } from 'src/interface/enum';
import { AddMovieRequest, AddMovieResponse } from 'src/interface/notification.interface';
import { MailerService } from '@nestjs-modules/mailer';
import { Observable, of } from 'rxjs';

@Controller('notification')
export class NotificationController {

    constructor(
        private readonly mailerService: MailerService,
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
    async movieAdd(payload: any) {
        for (const email of payload.data.emails) {
            const mailOptions = {
                to: email,
                subject: MESSAGE.ADD_MOVIE_SUBJECT,
                text: payload.title + MESSAGE.ADD_MOVIE_TEXT,
            };

            await this.mailerService.sendMail(mailOptions);
        }
        return;
    }


    @MessagePattern('notification.add.comment')
    async addComment(payload: any) {
        for (const email of payload.subscriberEmails.emails) {
            const mailOptions = {
                to: email,
                subject: MESSAGE.ADD_COMMENT_SUBJECT,
                text: `${payload.name.toUpperCase()}${MESSAGE.ADD_COMMENT_TEXT}"${payload.text}"${MESSAGE.ON_MOVIE}"${payload.movieName}"`,
            };
            await this.mailerService.sendMail(mailOptions);

        }
        return MESSAGE.EMAIL_SEND;
    }
}
