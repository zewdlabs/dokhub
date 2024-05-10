import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { PrismaService } from '@/modules/prisma/prisma.service';
import type { Role } from '@prisma/client';

@Injectable()
export class OrganizationService {
  constructor(private db: PrismaService) {}

  create(createOrganizationDto: CreateOrganizationDto) {
    return this.db.organization.create({
      data: createOrganizationDto,
    });
  }

  findAll() {
    return this.db.organization.findMany();
  }

  findOne(id: string) {
    return this.db.organization.findUnique({
      where: { id },
    });
  }

  update(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    return this.db.organization.update({
      where: { id },
      data: updateOrganizationDto,
    });
  }

  remove(id: string) {
    return this.db.organization.delete({
      where: { id },
    });
  }

  findAllOrgOfUser(userId: string) {
    return this.db.organization.findMany({
      where: {
        members: {
          some: {
            id: userId,
          },
        },
      },
    });
  }

  findOrgOfUser(orgId: string, userId: string) {
    return this.db.organization.findFirst({
      where: {
        id: orgId,
        members: {
          some: {
            id: userId,
          },
        },
      },
    });
  }

  findOrgWithUsers(orgId: string) {
    return this.db.organization.findFirst({
      where: { id: orgId },
      include: { members: true },
    });
  }

  addMember(orgId: string, userId: string) {
    return this.db.organization.update({
      where: { id: orgId },
      data: {
        members: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  removeMember(orgId: string, userId: string) {
    return this.db.organization.update({
      where: { id: orgId },
      data: {
        members: {
          disconnect: {
            id: userId,
          },
        },
      },
    });
  }

  changeRole(orgId: string, userId: string, role: Role) {
    return this.db.organization.update({
      where: { id: orgId },
      data: {
        members: {
          update: {
            where: { id: userId },
            data: { role },
          },
        },
      },
    });
  }
}
