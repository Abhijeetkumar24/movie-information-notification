import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.NODEMAILER_HOST,
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
