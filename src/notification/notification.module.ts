import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: 'smtp.gmail.com',
          auth: {
            
            user: process.env.GMAIL,
            pass: process.env.GMAIL_APP_PASSWORD,

          },
        },
      }),
    }),

  ],
  controllers: [NotificationController],
  providers: [NotificationService]
})
export class NotificationModule {}
