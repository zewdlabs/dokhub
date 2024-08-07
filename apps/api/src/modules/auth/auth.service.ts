import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { AuthEntity } from './auth.entity';
import { User } from '@prisma/client';
import { UserService, roundsOfHashing } from '@/modules/users/user.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import CreateUserDto from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import * as nodemailer from 'nodemailer';
import crypto from 'crypto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { EmailService } from '@/modules/email/email.service';
// import { CLIENT_RENEG_LIMIT } from 'tls';

const fakeUsers = [
  {
    id: 1,
    username: 'anson',
    password: 'password',
  },
  {
    id: 2,
    username: 'jack',
    password: 'password123',
  },
];

const EXPIRE_TIME = 20 * 1000;
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private usersService: UserService,
    private jwtService: JwtService,
    private emailService: EmailService,
    private configService: ConfigService,
  ) {}

  async signUp(data: CreateUserDto) {
    try {
      // Check if user exists
      const userExists = await this.usersService.findByEmail(data.email);
      if (userExists) {
        throw new BadRequestException('User already exists');
      }

      // Create new user
      const newUser = await this.usersService.createUser(data);

      // Generate verification code
      const verificationCode = this.generateVerificationCode().toString();

      // Save verification code in database
      await this.prisma.emailVerification.create({
        data: {
          code: verificationCode,
          email: data.email,
          userId: newUser.id,
        },
      });

      // Send verification email
      await this.sendVerificationEmail(data.email, verificationCode);

      // Generate tokens
      const tokens = await this.getTokens(
        newUser.id,
        newUser.email,
        newUser.role,
      );
      await this.updateRefreshToken(newUser, tokens.refreshToken);

      // Return success message
      return { message: 'User created successfully' };
    } catch (error) {
      console.error('Error during user sign up:', error);

      // Handle known errors
      if (error instanceof BadRequestException) {
        throw error;
      }

      // Handle unknown errors
      throw new InternalServerErrorException(
        'An error occurred during sign up',
      );
    }
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ tokens: AuthEntity; user: UserDto }> {
    // Step 1: Fetch a user with the given email
    const user = await this.prisma.user.findUnique({ where: { email: email } });

    // If no user is found, throw an error
    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password as string,
    );
    // Step 2: Check if the password is correct
    // const isPasswordValid = user.password === hashedPassword;

    // If password does not match, throw an error
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    // Step 3: Generate a JWT containing the user's ID and return it
    const tokens = await this.getTokens(user.id, user.email, user.role); //user.role
    await this.updateRefreshToken(user, tokens.refreshToken);

    const userDto: UserDto = {
      id: user.id,
      email: user.email,
      name: user.name,
      prefix: user.prefix,
      phone: user.phone,
      bio: user.bio,
      occupation: user.occupation,
      specialty: user.specialty,
      medicalLicenseNumber: user.medicalLicenseNumber,
      yearsOfExperience: user.yearsOfExperience,
      verificationStatus: user.verificationStatus,
      role: user.role,
      followedByCount: user.followedByCount,
      followingCount: user.followingCount,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      profileUrl: user.profileUrl,
      image: user.profileUrl,
      emailVerified: user.emailVerified,
      onboardingStatus: user.onboardingStatus,
    };

    return { tokens, user: userDto };
  }

  private async sendVerificationEmail(email: string, code: string) {
    // const transporter = nodemailer.createTransport({
    //   host: 'https://smtp.gmail.com',
    //   port: 587,
    //   secure: false,
    //   auth: {
    //     user: this.configService.get<string>('EMAIL_USERNAME'),
    //     pass: this.configService.get<string>('EMAIL_PASSWORD'),
    //   },
    // });

    // const transporter = nodemailer.createTransport({
    //   host: this.configService.get<string>('EMAIL_HOST'),
    //   port: this.configService.get<number>('EMAIL_PORT'),
    //   secure: false, // false for TLS
    //   auth: {
    //     user: this.configService.get<string>('EMAIL_USERNAME'),
    //     pass: this.configService.get<string>('EMAIL_PASSWORD'),
    //   },
    // });

    // const mailOptions = {
    //   from: this.configService.get<string>('EMAIL_USERNAME'),
    //   to: email,
    //   subject: 'Email Verification',
    //   text: `Please verify your email using this code: ${code}`,
    // };
    await this.emailService.sendVerificationEmail(email, code);
    // await transporter.sendMail(mailOptions);
  }

  async updateRefreshToken(user: User, refreshToken: string) {
    if (!user) {
      throw new Error('User object is null or undefined');
    }
    const hashedRefreshToken = await bcrypt.hash(refreshToken, roundsOfHashing);
    user.refreshToken = hashedRefreshToken;
    await this.usersService.updateUser({
      where: { id: user.id },
      data: user,
    });
  }
  async getTokens(userId: string, email: string, role: string) {
    //, role: string
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          role,
        },
        {
          secret:
            this.configService.get<string>('JWT_ACCESS_SECRET') || 'secretyy',
          expiresIn: '5h',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          role,
        },
        {
          secret:
            this.configService.get<string>('JWT_REFRESH_SECRET') ||
            'secrtuteiw',
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }
  validateUser({ email, password }: LoginDto) {
    const findUser = fakeUsers.find((user) => user.username === email);
    if (!findUser) return null;
    if (password === findUser.password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...user } = findUser;
      return this.jwtService.sign(user);
    }
  }
  async refreshToken(user: any) {
    const tokens = await this.getTokens(user.sub, user.email, user.role);
    const userUpdate = await this.usersService.findOne(user.sub);
    await this.updateRefreshToken(userUpdate as User, tokens.refreshToken);
    return tokens;
    // return {
    //   accessToken: await this.jwtService.signAsync(payload, {
    //     expiresIn: '5h',
    //     secret:
    //       this.configService.get<string>('JWT_ACCESS_SECRET') || 'secrtuteiw',
    //   }),
    //   refreshToken: await this.jwtService.signAsync(payload, {
    //     expiresIn: '7d',
    //     secret:
    //       this.configService.get<string>('JWT_REFRESH_SECRET') || 'secrtuteiw',
    //   }),
    //   expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    // };
  }

  async verifyEmailCode(code: string, email: string): Promise<boolean> {
    const verification = await this.prisma.emailVerification.findUnique({
      where: { code, email },
    });

    if (!verification || verification.expiresAt < new Date()) {
      return false;
    }

    await this.prisma.user.update({
      where: { id: verification.userId },
      data: { emailVerified: new Date() },
    });

    await this.prisma.emailVerification.delete({
      where: { id: verification.id },
    });

    return true;
  }

  generateVerificationCode() {
    const min = 100000;
    const max = 999999;
    const range = max - min + 1;

    const randomBuffer = crypto.randomBytes(4);
    const randomNumber = randomBuffer.readUInt32BE(0);

    return min + (randomNumber % range);
  }

  async requestPasswordReset(data: { email: string }): Promise<void> {
    const user = await this.usersService.findByEmail(data.email);
    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = await bcrypt.hash(resetToken, 10);

    const existingVerification = await this.prisma.emailVerification.findUnique(
      {
        where: { email: user.email },
      },
    );
    if (existingVerification) {
      await this.prisma.emailVerification.delete({
        where: { email: user.email },
      });
    }
    await this.prisma.emailVerification.create({
      data: {
        code: hashedToken,
        email: user.email,
        userId: user.id,
        expiresAt: new Date(Date.now() + 3600000), // 1 hour
      },
    });
    // await this.emailService.sendPasswordResetEmail(user.email, hashedToken);
    const transporter = nodemailer.createTransport({
      host: this.configService.get<string>('EMAIL_HOST'),
      port: this.configService.get<number>('EMAIL_PORT'),
      secure: false, // false for TLS
      auth: {
        user: this.configService.get<string>('EMAIL_USERNAME'),
        pass: this.configService.get<string>('EMAIL_PASSWORD'),
      },
    });
    const resetLink = `${this.configService.get('FRONTEND_URL')}/auth/reset-password?token=${resetToken}&email=${user.email}`;
    await transporter.sendMail({
      to: user.email,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Click here to reset your password: ${resetLink}`,
    });
  }

  async resetPassword(data: ResetPasswordDto): Promise<void> {
    const { email, token, newPassword } = data;

    const emailVerification = await this.prisma.emailVerification.findUnique({
      where: { email },
    });

    if (
      !emailVerification ||
      !(await bcrypt.compare(token, emailVerification.code)) ||
      emailVerification.expiresAt < new Date()
    ) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    await this.prisma.emailVerification.delete({
      where: { email },
    });
  }
}
