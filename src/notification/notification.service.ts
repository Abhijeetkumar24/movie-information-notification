import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MESSAGE } from 'src/interface/enum';

@Injectable()
export class NotificationService {

    constructor(
        private readonly mailerService: MailerService,
    ) { }


    /**
     * Processes the addition of a movie and sends notification emails to subscribers.
     *
     * @param {any} payload - The payload containing movie and subscriber information.
     * @returns {Promise<void>} A Promise that resolves when the movie addition notification emails are sent.
     * @throws {Error} Throws an error if there is an issue during the notification process.
     */
    async movieAdd(payload: any): Promise<void> {
        try {
            const mailOptions = {
                to: payload.data.emails,
                subject: MESSAGE.ADD_MOVIE_SUBJECT,
                text: payload.title + MESSAGE.ADD_MOVIE_TEXT,
            };

            this.mailerService.sendMail(mailOptions);
            return;
        } catch (error) {
            throw error;
        }
    }



    /**
     * Processes the addition of a comment and sends notification emails to subscribers.
     *
     * @param {any} payload - The payload containing comment and subscriber information.
     * @returns {Promise<string>} A Promise that resolves with a success message when the comment addition notification emails are sent.
     * @throws {Error} Throws an error if there is an issue during the notification process.
     */
    async addComment(payload: any): Promise<string> {
        try {
            const mailOptions = {
                to: payload.subscriberEmails.emails,
                subject: MESSAGE.ADD_COMMENT_SUBJECT,
                text: `${payload.name.toUpperCase()}${MESSAGE.ADD_COMMENT_TEXT}"${payload.text}"${MESSAGE.ON_MOVIE}"${payload.movieName}"`,
            };

            this.mailerService.sendMail(mailOptions);
            return MESSAGE.EMAIL_SEND;
        } catch (error) {
            throw error;
        }
    }
}
