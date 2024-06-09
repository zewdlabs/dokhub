import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';
import * as nodemailer from 'nodemailer';

jest.mock('nodemailer');

describe('EmailService', () => {
  let emailService: EmailService;
  let configService: ConfigService;
  let transporterMock: nodemailer.Transporter;

  beforeEach(async () => {
    transporterMock = {
      sendMail: jest.fn(),
    } as unknown as nodemailer.Transporter;

    (nodemailer.createTransport as jest.Mock).mockReturnValue(transporterMock);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              switch (key) {
                case 'EMAIL_HOST':
                  return 'smtp.example.com';
                case 'EMAIL_PORT':
                  return 587;
                case 'EMAIL_USERNAME':
                  return 'user@example.com';
                case 'EMAIL_PASSWORD':
                  return 'password';
                case 'FRONTEND_URL':
                  return 'http://localhost:3000';
                default:
                  return null;
              }
            }),
          },
        },
      ],
    }).compile();

    emailService = module.get<EmailService>(EmailService);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(emailService).toBeDefined();
  });

  describe('sendVerificationEmail', () => {
    it('should send a verification email', async () => {
      const email = 'testuser@example.com';
      const code = '123456';

      await emailService.sendVerificationEmail(email, code);

      expect(transporterMock.sendMail).toHaveBeenCalledWith({
        from: 'user@example.com',
        to: email,
        subject: 'Email Verification',
        text: `Please verify your email using this code: ${code}`,
      });
    });

    it('should log an error if email sending fails', async () => {
      const email = 'testuser@example.com';
      const code = '123456';
      const error = new Error('Failed to send email');
      (transporterMock.sendMail as jest.Mock).mockRejectedValue(error);
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      await emailService.sendVerificationEmail(email, code);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error sending email:',
        error,
      );

      consoleErrorSpy.mockRestore();
    });
  });

  describe('sendPasswordResetEmail', () => {
    it('should send a password reset email', async () => {
      const userEmail = 'test@example.com';
      const resetToken = 'reset-token-123';

      await emailService.sendPasswordResetEmail(userEmail, resetToken);

      const resetLink = `http://localhost:3000/auth/reset-password?token=${resetToken}&email=${userEmail}`;

      expect(transporterMock.sendMail).toHaveBeenCalledWith({
        to: userEmail,
        subject: 'Password Reset Request',
        text: `You requested a password reset. Click here to reset your password: ${resetLink}`,
      });
    });

    it('should log an error if password reset email sending fails', async () => {
      const userEmail = 'test@example.com';
      const resetToken = 'reset-token-123';
      const error = new Error('Failed to send email');
      (transporterMock.sendMail as jest.Mock).mockRejectedValue(error);
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      await emailService.sendPasswordResetEmail(userEmail, resetToken);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error sending password reset email:',
        error,
      );

      consoleErrorSpy.mockRestore();
    });
  });
});
