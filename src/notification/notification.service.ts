import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MESSAGE } from 'src/interface/enum';

@Injectable()
export class NotificationService {

    constructor(
        private readonly mailerService: MailerService,
    ) { }

    async movieAdd(payload: any): Promise<void> {
        const mailOptions = {
            to: payload.data.emails,
            subject: MESSAGE.ADD_MOVIE_SUBJECT,
            text: payload.title + MESSAGE.ADD_MOVIE_TEXT,
        };

        this.mailerService.sendMail(mailOptions);

        return;
    }


    async addComment(payload: any): Promise<string> {
        const mailOptions = {
            to: payload.subscriberEmails.emails,
            subject: MESSAGE.ADD_COMMENT_SUBJECT,
            text: `${payload.name.toUpperCase()}${MESSAGE.ADD_COMMENT_TEXT}"${payload.text}"${MESSAGE.ON_MOVIE}"${payload.movieName}"`,
        };

        this.mailerService.sendMail(mailOptions);

        return MESSAGE.EMAIL_SEND;
    }
}
