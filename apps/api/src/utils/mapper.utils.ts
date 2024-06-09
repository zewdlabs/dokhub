// src/utils/mapper.util.ts
import { User as PrismaUser } from '@prisma/client';
import { UserDto } from '../modules/auth/dto/user.dto';

export function mapUserDto(
  input: PrismaUser | PrismaUser[],
): UserDto | UserDto[] {
  if (Array.isArray(input)) {
    return input.map((user) => mapSingleUserDto(user));
  } else {
    return mapSingleUserDto(input);
  }
}

function mapSingleUserDto(user: PrismaUser): UserDto {
  return {
    profileUrl: user.profileUrl,
    emailVerified: user.emailVerified,
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
}
