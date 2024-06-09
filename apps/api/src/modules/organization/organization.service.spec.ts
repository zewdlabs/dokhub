import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Role } from '@prisma/client';

describe('OrganizationService', () => {
  let service: OrganizationService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationService,
        {
          provide: PrismaService,
          useValue: {
            organization: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
              findFirst: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<OrganizationService>(OrganizationService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new organization', async () => {
      const createOrganizationDto: CreateOrganizationDto = {
        name: 'Test Organization',
        slug: 'This is a test organization',
      };
      jest
        .spyOn(prisma.organization, 'create')
        .mockResolvedValue(createOrganizationDto as any);

      expect(await service.create(createOrganizationDto)).toEqual(
        createOrganizationDto,
      );
      expect(prisma.organization.create).toHaveBeenCalledWith({
        data: createOrganizationDto,
      });
    });
  });

  describe('findAll', () => {
    it('should return all organizations', async () => {
      const organizations = [
        { id: '1', name: 'Org 1' },
        { id: '2', name: 'Org 2' },
      ];
      jest
        .spyOn(prisma.organization, 'findMany')
        .mockResolvedValue(organizations as any);

      expect(await service.findAll()).toEqual(organizations);
      expect(prisma.organization.findMany).toHaveBeenCalledWith({
        include: {
          memberships: true,
          posts: true,
        },
      });
    });
  });

  describe('findOne', () => {
    it('should return a single organization', async () => {
      const organization = { id: '1', name: 'Org 1' };
      jest
        .spyOn(prisma.organization, 'findUnique')
        .mockResolvedValue(organization as any);

      expect(await service.findOne('1')).toEqual(organization);
      expect(prisma.organization.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });

  describe('update', () => {
    it('should update an organization', async () => {
      const updateOrganizationDto: UpdateOrganizationDto = {
        name: 'Updated Org',
      };
      const updatedOrganization = { id: '1', name: 'Updated Org' };
      jest
        .spyOn(prisma.organization, 'update')
        .mockResolvedValue(updatedOrganization as any);

      expect(await service.update('1', updateOrganizationDto)).toEqual(
        updatedOrganization,
      );
      expect(prisma.organization.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: updateOrganizationDto,
      });
    });
  });

  describe('remove', () => {
    it('should remove an organization', async () => {
      const deletedOrganization = { id: '1', name: 'Deleted Org' };
      jest
        .spyOn(prisma.organization, 'delete')
        .mockResolvedValue(deletedOrganization as any);

      expect(await service.remove('1')).toEqual(deletedOrganization);
      expect(prisma.organization.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });

  describe('findAllOrgOfUser', () => {
    it('should return all organizations of a user', async () => {
      const organizations = [
        { id: '1', name: 'Org 1' },
        { id: '2', name: 'Org 2' },
      ];
      jest
        .spyOn(prisma.organization, 'findMany')
        .mockResolvedValue(organizations as any);

      expect(await service.findAllOrgOfUser('1')).toEqual(organizations);
      expect(prisma.organization.findMany).toHaveBeenCalledWith({
        where: {
          memberships: {
            some: {
              id: '1',
            },
          },
        },
      });
    });
  });

  describe('findOrgOfUser', () => {
    it('should return a single organization of a user', async () => {
      const organization = { id: '1', name: 'Org 1' };
      jest
        .spyOn(prisma.organization, 'findFirst')
        .mockResolvedValue(organization as any);

      expect(await service.findOrgOfUser('1', '1')).toEqual(organization);
      expect(prisma.organization.findFirst).toHaveBeenCalledWith({
        where: {
          id: '1',
          memberships: {
            some: {
              id: '1',
            },
          },
        },
      });
    });
  });

  describe('findOrgWithUsers', () => {
    it('should return an organization with users', async () => {
      const organization = { id: '1', name: 'Org 1', memberships: [] };
      jest
        .spyOn(prisma.organization, 'findFirst')
        .mockResolvedValue(organization as any);

      expect(await service.findOrgWithUsers('1')).toEqual(organization);
      expect(prisma.organization.findFirst).toHaveBeenCalledWith({
        where: { id: '1' },
        include: { memberships: true },
      });
    });
  });

  describe('addMember', () => {
    it('should add a member to an organization', async () => {
      const updatedOrganization = {
        id: '1',
        name: 'Org 1',
        memberships: [{ id: '2' }],
      };
      jest
        .spyOn(prisma.organization, 'update')
        .mockResolvedValue(updatedOrganization as any);

      expect(await service.addMember('1', '2')).toEqual(updatedOrganization);
      expect(prisma.organization.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: {
          memberships: {
            connect: {
              id: '2',
            },
          },
        },
      });
    });
  });

  describe('removeMember', () => {
    it('should remove a member from an organization', async () => {
      const updatedOrganization = { id: '1', name: 'Org 1', memberships: [] };
      jest
        .spyOn(prisma.organization, 'update')
        .mockResolvedValue(updatedOrganization as any);

      expect(await service.removeMember('1', '2')).toEqual(updatedOrganization);
      expect(prisma.organization.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: {
          memberships: {
            disconnect: {
              id: '2',
            },
          },
        },
      });
    });
  });

  describe('changeRole', () => {
    it('should change the role of a member in an organization', async () => {
      const updatedOrganization = {
        id: '1',
        name: 'Org 1',
        memberships: [{ id: '2', role: 'ADMIN' }],
      };
      jest
        .spyOn(prisma.organization, 'update')
        .mockResolvedValue(updatedOrganization as any);

      expect(await service.changeRole('1', '2', 'ADMIN' as Role)).toEqual(
        updatedOrganization,
      );
      expect(prisma.organization.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: {
          memberships: {
            update: {
              where: { id: '2' },
              data: { role: 'ADMIN' },
            },
          },
        },
      });
    });
  });
});
