
import { Controller} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {

    constructor(
        private readonly notificationService: NotificationService,
    ) { };

  
    /**
     * Message pattern handler for the 'movie.add' event.
     *
     * @param {any} payload - The payload received with the 'movie.add' event.
     * @returns {Promise<void>} A Promise that resolves when the movie addition notification process is completed.
     * @throws {Error} Throws an error if there is an issue during the notification process.
     */
    @MessagePattern('movie.add')
    async movieAdd(payload: any): Promise<void> {
        try {
            return this.notificationService.movieAdd(payload);
        } catch (error) {
            throw error;
        }
    }



    /**
     * Message pattern handler for the 'notification.add.comment' event.
     *
     * @param {any} payload - The payload received with the 'notification.add.comment' event.
     * @returns {Promise<string>} A Promise that resolves with a string when the comment addition notification process is completed.
     * @throws {Error} Throws an error if there is an issue during the notification process.
     */
    @MessagePattern('notification.add.comment')
    async addComment(payload: any): Promise<string> {
        try {
            return this.notificationService.addComment(payload);
        } catch (error) {
            throw error;
        }
    }
}
