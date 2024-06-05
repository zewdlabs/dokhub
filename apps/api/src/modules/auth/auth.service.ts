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
import { UserDto } from './dto/user.dto';
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
    private configService: ConfigService,
  ) {}

  async signUp(data: CreateUserDto) {
    // Check if user exists
    const userExists = await this.usersService.findByEmail(data.email);

    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const newUser = await this.usersService.createUser(data);
    const tokens = await this.getTokens(
      newUser.id,
      newUser.email,
      newUser.role,
    );
    await this.updateRefreshToken(newUser, tokens.refreshToken);
    return;
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
    // console.log(hashedPassword);
    // Step 2: Check if the password is correct
    // const isPasswordValid = user.password === hashedPassword;

    // If password does not match, throw an error
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    // Step 3: Generate a JWT containing the user's ID and return it
    const tokens = await this.getTokens(user.id, user.email, user.role); //user.role
    await this.updateRefreshToken(user, tokens.refreshToken);
    console.log('IT IS IN THE LOGIN');
    console.log(tokens);
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
    };
    // const { password, refreshToken, ...safeUser } = user;
    return { tokens, user: userDto };
  }

  async updateRefreshToken(user: User, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, roundsOfHashing);
    user.refreshToken = hashedRefreshToken;
    await this.usersService.updateUser({
      where: { id: user.id },
      data: user,
    });
  }
  async getTokens(userId: string, email: string, role: string) {
    console.log('IT IS IN THE GET TOKENS');
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
    console.log('123213213231231231=================', user);
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
}
