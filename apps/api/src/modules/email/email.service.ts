import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailService: MailerService) {}

  sendMail(mailOptions: {
    from: string;
    to: string;
    subject: string;
    text: string;
  }) {
    this.mailService.sendMail({
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      text: mailOptions.text,
    });
  }
}
