import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@/prisma/prisma.service';
import { AuthEntity } from './auth.entity';
import { Prisma, User } from '@prisma/client';
import { UserService, roundsOfHashing } from '@/users/user.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

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
  ) {}

  async signUp(data: Prisma.UserCreateInput): Promise<any> {
    // Check if user exists
    const userExists = await this.usersService.findByEmail(
      data.email as string,
    );
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const newUser = await this.usersService.createUser(data);
    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRefreshToken(newUser, tokens.refreshToken);
    return tokens;
  }

  async login(email: string, password: string): Promise<AuthEntity> {
    // Step 1: Fetch a user with the given email
    const user = await this.prisma.user.findUnique({ where: { email: email } });

    // If no user is found, throw an error
    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    // Step 2: Check if the password is correct
    const isPasswordValid = user.password === password;

    // If password does not match, throw an error
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    // Step 3: Generate a JWT containing the user's ID and return it
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user, tokens.refreshToken);
    return tokens;
  }

  async updateRefreshToken(user: User, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, roundsOfHashing);
    user.refreshToken = hashedRefreshToken;
    await this.usersService.updateUser({
      where: { id: user.id },
      data: user,
    });
  }
  async getTokens(userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
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
