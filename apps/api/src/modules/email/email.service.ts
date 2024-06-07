import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('EMAIL_HOST'),
      port: this.configService.get<number>('EMAIL_PORT'),
      secure: false, // false for TLS
      auth: {
        user: this.configService.get<string>('EMAIL_USERNAME'),
        pass: this.configService.get<string>('EMAIL_PASSWORD'),
      },
    });
  }
  async sendVerificationEmail(email: string, code: string) {
    const mailOptions = {
      from: this.configService.get<string>('EMAIL_USERNAME'),
      to: email,
      subject: 'Email Verification',
      text: `Please verify your email using this code: ${code}`,
    };
    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  async sendPasswordResetEmail(userEmail: string, resetToken: string) {
    const resetLink = `${this.configService.get('FRONTEND_URL')}/auth/reset-password?token=${resetToken}&email=${userEmail}`;

    try {
      await this.transporter.sendMail({
        to: userEmail,
        subject: 'Password Reset Request',
        text: `You requested a password reset. Click here to reset your password: ${resetLink}`,
      });
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }
  }
}
