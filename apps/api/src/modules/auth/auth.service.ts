import {
  BadRequestException,
  Injectable,
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
import { EmailService } from '../email/email.service';

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

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private emailService: EmailService,
  ) {}
  private async sendVerificationEmail(email: string, code: string) {
    const mailOptions = {
      from: this.configService.get<string>('EMAIL_USER')!,
      to: email,
      subject: 'Email Verification',
      text: `Please verify your email using this code: ${code}`,
    };

    await this.emailService.sendMail(mailOptions);
  }
  async signUp(
    data: CreateUserDto,
  ): Promise<{ status: string; message: string }> {
    // Check if user exists
    const userExists = await this.usersService.findByEmail(
      data.email as string,
    );
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const newUser = await this.usersService.createUser(data);
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    await this.prisma.emailVerification.create({
      data: {
        code: verificationCode.toString(),
        email: data.email,
        userId: newUser.id,
      },
    });

    await this.sendVerificationEmail(data.email, verificationCode.toString());
    // const tokens = await this.getTokens(
    //   newUser.id,
    //   newUser.email,
    //   newUser.role,
    // );
    // await this.updateRefreshToken(newUser, tokens.refreshToken);
    // return tokens;
    return {
      status: 'successful',
      message: 'user created successfully. please check your email',
    };
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ tokens: AuthEntity; user: User }> {
    // Step 1: Fetch a user with the given email
    const user = await this.prisma.user.findUnique({ where: { email: email } });

    // If no user is found, throw an error
    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password!);
    // console.log(hashedPassword);
    // Step 2: Check if the password is correct
    // const isPasswordValid = user.password === hashedPassword;

    // If password does not match, throw an error
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    // Step 3: Generate a JWT containing the user's ID and return it
    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRefreshToken(user, tokens.refreshToken);
    return { tokens, user };
  }

  async updateRefreshToken(user: User, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, roundsOfHashing);
    user.refreshToken = hashedRefreshToken;
    await this.usersService.updateUser({
      where: { id: user.id },
      data: user,
    });
  }

  async verifyEmailCode(code: string): Promise<boolean> {
    const verification = await this.prisma.emailVerification.findUnique({
      where: { code: code },
    });

    if (!verification || verification.expiresAt < new Date()) {
      //TODO: we should handle this better
      return false;
    }

    await this.prisma.user.update({
      where: { id: verification.userId },
      data: { emailVerified: new Date().toISOString() },
    });

    await this.prisma.emailVerification.delete({
      where: { id: verification.id },
    });

    return true;
  }

  async getTokens(userId: string, email: string, role: string | null) {
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
          expiresIn: '15m',
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
}
