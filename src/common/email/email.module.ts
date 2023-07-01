import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST_ADDRESS,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      defaults: {
        from: process.env.SMTP_USERNAME,
      },
      template: {
        dir: __dirname + '/../../../view/email',
        adapter: new HandlebarsAdapter(),
        options: {
          allowProtoMethodsByDefault: true,
          allowProtoPropertiesByDefault: true,
        },
      },
    }),
  ],
  providers: [EmailService],
  exports: [EmailService, MailerModule],
})
export class EmailModule {}
