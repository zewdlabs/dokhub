import { Role, User, VerificationStatus } from '@prisma/client';

export class UserDto implements Omit<User, 'password' | 'refreshToken'> {
  profileUrl: string | null;
  emailVerified: Date | null;
  onboardingStatus: boolean;
  //   refreshToken: string | null;
  id: string;
  email: string;
  name: string;
  prefix: string | null;
  phone: string | null;
  bio: string | null;
  occupation: string | null;
  specialty: string | null;
  medicalLicenseNumber: string | null;
  yearsOfExperience: number | null;
  verificationStatus: VerificationStatus;
  role: Role;
  image: string | null;
  followedByCount: number;
  followingCount: number;
  createdAt: Date;
  updatedAt: Date;
}
