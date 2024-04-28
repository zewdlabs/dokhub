import { PrismaClient, RoleType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      fullName: 'Aiden Johnson',
      username: 'aidenjohnson',
      prefix: 'Dr.',
      email: 'aiden.johnson@example.com',
      password: await bcrypt.hash('aiden123', 10),
      phone: '555-123-4567',
      bio: 'Experienced surgeon specializing in orthopedics.',
      refreshToken: null,
      occupation: 'Surgeon',
      specialty: 'Orthopedics',
      yearsOfExperience: 15,
      medicalLicenseNumber: 'GHI789JKL',
    },
  });

  const user1Workspace = await prisma.workspace.create({
    data: {
      name: 'Personal Workspace',
      slug: 'aidenjohnson',
      roles: {
        create: { user: { connect: { id: user1.id } }, role: RoleType.CREATOR },
      },
      members: {
        connect: [user1],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      fullName: 'Sophia Patel',
      username: 'sophiapatel',
      prefix: null,
      email: 'sophia.patel@example.com',
      password: await bcrypt.hash('sophia123', 10),
      phone: '555-987-6543',
      bio: "Passionate pediatrician dedicated to children's health.",
      refreshToken: null,
      occupation: 'Pediatrician',
      specialty: 'Pediatrics',
      yearsOfExperience: 8,
      medicalLicenseNumber: 'MNO012PQR',
    },
  });

  await prisma.workspace.create({
    data: {
      name: 'Personal Workspace',
      slug: 'sophiapatel',
      roles: {
        create: { user: { connect: { id: user2.id } }, role: RoleType.CREATOR },
      },
    },
  });

  const user3 = await prisma.user.create({
    data: {
      fullName: 'Elijah Chang',
      username: 'elijahchang',
      prefix: 'Dr.',
      email: 'elijah.chang@example.com',
      password: await bcrypt.hash('elijah123', 10),
      phone: '555-789-0123',
      bio: 'Skilled cardiologist with a focus on preventive care.',
      refreshToken: null,
      occupation: 'Cardiologist',
      specialty: 'Cardiology',
      yearsOfExperience: 12,
      medicalLicenseNumber: 'STU345VWX',
    },
  });

  await prisma.workspace.create({
    data: {
      name: 'Personal Workspace',
      slug: 'elijahchang',
      roles: {
        create: { user: { connect: { id: user3.id } }, role: RoleType.CREATOR },
      },
    },
  });

  const user4 = await prisma.user.create({
    data: {
      username: 'isabellagarcia',
      fullName: 'Isabella Garcia',
      prefix: null,
      email: 'isabella.garcia@example.com',
      password: await bcrypt.hash('isabella123', 10),
      phone: '555-234-5678',
      bio: 'Compassionate nurse committed to patient care.',
      refreshToken: null,
      occupation: 'Nurse',
      specialty: null,
      yearsOfExperience: 6,
      medicalLicenseNumber: null,
    },
  });

  await prisma.workspace.create({
    data: {
      name: 'Personal Workspace',
      slug: 'isabellagarcia',
      roles: {
        create: { user: { connect: { id: user4.id } }, role: RoleType.CREATOR },
      },
    },
  });

  const workspace1 = await prisma.workspace.create({
    data: {
      name: "Saint Paul's Millennium Medical College",
      slug: 'spmmc',
      members: {
        connect: [
          { id: user1.id }, // Connect user1 to the organization
          { id: user2.id }, // Connect user2 to the organization
        ],
      },

      roles: {
        create: [
          { user: { connect: { id: user1.id } }, role: RoleType.CREATOR },
          { user: { connect: { id: user2.id } }, role: RoleType.MEMBER },
        ],
      },
    },
  });

  // Create posts by organization members
  await prisma.post.create({
    data: {
      title: 'Post 1',
      content: 'Content of Post 1',
      published: true,
      authorId: user2.id, // User 1 creates this post
      workspaceId: workspace1.id,
    },
  });

  await prisma.post.create({
    data: {
      title: 'Post 2',
      content: 'Content of Post 2',
      published: true,
      authorId: user2.id, // User 2 creates this post
      workspaceId: user1Workspace.id,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
