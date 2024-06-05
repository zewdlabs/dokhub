import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      name: 'Aiden Johnson',
      prefix: 'Dr',
      email: 'aiden.johnson@gmail.com',
      password: await bcrypt.hash('aiden123', 10),
      phone: '+251931612090',
      bio: 'Experienced surgeon specializing in orthopedics.',
      occupation: 'Surgeon',
      specialty: 'Orthopedics',
      yearsOfExperience: 15,
      medicalLicenseNumber: 'GHI789JKL',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Sophia Patel',
      prefix: null,
      email: 'sophia.patel@yahoo.com',
      password: await bcrypt.hash('sophia123', 10),
      phone: '555-987-6543',
      bio: "Passionate pediatrician dedicated to children's health.",
      occupation: 'Pediatrician',
      specialty: 'Pediatrics',
      yearsOfExperience: 8,
      medicalLicenseNumber: 'MNO012PQR',
      role: Role.USER,
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: 'Elijah Chang',
      prefix: 'Dr.',
      email: 'elijah.chang@example.com',
      password: await bcrypt.hash('elijah123', 10),
      phone: '555-789-0123',
      bio: 'Skilled cardiologist with a focus on preventive care.',
      occupation: 'Cardiologist',
      specialty: 'Cardiology',
      yearsOfExperience: 12,
      medicalLicenseNumber: 'STU345VWX',
      role: Role.CREATOR,
    },
  });

  const user4 = await prisma.user.create({
    data: {
      name: 'Isabella Garcia',
      prefix: null,
      email: 'isabella.garcia@example.com',
      password: await bcrypt.hash('isabella123', 10),
      phone: '555-234-5678',
      bio: 'Compassionate nurse committed to patient care.',
      occupation: 'Nurse',
      specialty: null,
      yearsOfExperience: 6,
      medicalLicenseNumber: null,
      role: Role.SUADMIN,
    },
  });

  const user5 = await prisma.user.create({
    data: {
      name: 'Oliver Smith',
      prefix: null,
      email: 'oliver.smith@example.com',
      password: await bcrypt.hash('oliver123', 10),
      phone: '555-345-6789',
      bio: 'Dedicated family physician providing comprehensive healthcare.',
      occupation: 'Family Physician',
      specialty: null,
      yearsOfExperience: 10,
      medicalLicenseNumber: null,
      role: Role.ADMIN,
    },
  });

  const user6 = await prisma.user.create({
    data: {
      name: 'Emma Wilson',
      prefix: 'Dr.',
      email: 'emma.wilson@example.com',
      password: await bcrypt.hash('emma123', 10),
      phone: '555-876-5432',
      bio: 'Experienced dermatologist specializing in skin health.',
      occupation: 'Dermatologist',
      specialty: 'Dermatology',
      yearsOfExperience: 14,
      medicalLicenseNumber: 'YZA678BCD',
      role: Role.CREATOR,
    },
  });

  const user7 = await prisma.user.create({
    data: {
      name: 'Liam Johnson',
      prefix: null,
      email: 'liam.johnson@example.com',
      password: await bcrypt.hash('liam123', 10),
      phone: '555-234-5678',
      bio: 'Passionate psychiatrist dedicated to mental health.',
      occupation: 'Psychiatrist',
      specialty: 'Psychiatry',
      yearsOfExperience: 9,
      medicalLicenseNumber: 'EFG901HIJ',
      role: Role.USER,
    },
  });

  const user8 = await prisma.user.create({
    data: {
      name: 'Ava Davis',
      prefix: null,
      email: 'ava.davis@example.com',
      password: await bcrypt.hash('ava123', 10),
      phone: '555-789-0123',
      bio: 'Compassionate nurse committed to patient care.',
      occupation: 'Nurse',
      specialty: null,
      yearsOfExperience: 6,
      medicalLicenseNumber: null,
      role: Role.USER,
    },
  });

  const user9 = await prisma.user.create({
    data: {
      name: 'Noah Martinez',
      prefix: null,
      email: 'noah.martinez@example.com',
      password: await bcrypt.hash('noah123', 10),
      phone: '555-987-6543',
      bio: 'Skilled neurologist specializing in brain and nervous system disorders.',
      occupation: 'Neurologist',
      specialty: 'Neurology',
      yearsOfExperience: 11,
      medicalLicenseNumber: 'KLM234NOP',
      role: Role.USER,
    },
  });
  // Create organization with members
  await prisma.organization.create({
    data: {
      name: "Saint Paul's Millenium Medical College",
      slug: 'spmmc',
      location: 'Gulele Sub-City, Addis Ababa, Ethiopia PO Box 1271',
    },
  });

  await prisma.follows.createMany({
    data: [
      { followedById: user1.id, followingId: user2.id },
      { followedById: user1.id, followingId: user3.id },
      { followedById: user1.id, followingId: user4.id },
      { followedById: user1.id, followingId: user5.id },
      { followedById: user1.id, followingId: user6.id },
      { followedById: user1.id, followingId: user7.id },
      { followedById: user1.id, followingId: user8.id },
      { followedById: user1.id, followingId: user9.id },
      { followedById: user2.id, followingId: user1.id },
      { followedById: user2.id, followingId: user3.id },
      { followedById: user2.id, followingId: user5.id },
      { followedById: user2.id, followingId: user6.id },
      { followedById: user2.id, followingId: user7.id },
      { followedById: user2.id, followingId: user8.id },
      { followedById: user2.id, followingId: user9.id },
      { followedById: user3.id, followingId: user1.id },
      { followedById: user3.id, followingId: user2.id },
      { followedById: user3.id, followingId: user5.id },
      { followedById: user3.id, followingId: user6.id },
      { followedById: user3.id, followingId: user7.id },
      { followedById: user3.id, followingId: user8.id },
      { followedById: user3.id, followingId: user9.id },
      { followedById: user4.id, followingId: user1.id },
      { followedById: user4.id, followingId: user2.id },
      { followedById: user4.id, followingId: user3.id },
      { followedById: user4.id, followingId: user5.id },
      { followedById: user4.id, followingId: user6.id },
      { followedById: user4.id, followingId: user7.id },
      { followedById: user4.id, followingId: user8.id },
      { followedById: user4.id, followingId: user9.id },
      { followedById: user5.id, followingId: user1.id },
      { followedById: user5.id, followingId: user2.id },
      { followedById: user5.id, followingId: user3.id },
      { followedById: user5.id, followingId: user6.id },
      { followedById: user5.id, followingId: user7.id },
      { followedById: user5.id, followingId: user8.id },
      { followedById: user5.id, followingId: user9.id },
      { followedById: user6.id, followingId: user1.id },
      { followedById: user6.id, followingId: user2.id },
      { followedById: user6.id, followingId: user3.id },
      { followedById: user6.id, followingId: user5.id },
      { followedById: user6.id, followingId: user7.id },
      { followedById: user6.id, followingId: user8.id },
      { followedById: user6.id, followingId: user9.id },
      { followedById: user7.id, followingId: user1.id },
      { followedById: user7.id, followingId: user2.id },
      { followedById: user7.id, followingId: user3.id },
      { followedById: user7.id, followingId: user5.id },
      { followedById: user7.id, followingId: user6.id },
      { followedById: user7.id, followingId: user8.id },
      { followedById: user7.id, followingId: user9.id },
      { followedById: user8.id, followingId: user1.id },
      { followedById: user8.id, followingId: user2.id },
      { followedById: user8.id, followingId: user3.id },
      { followedById: user8.id, followingId: user5.id },
      { followedById: user8.id, followingId: user6.id },
      { followedById: user8.id, followingId: user7.id },
      { followedById: user8.id, followingId: user9.id },
      { followedById: user9.id, followingId: user1.id },
      { followedById: user9.id, followingId: user2.id },
      { followedById: user9.id, followingId: user3.id },
      { followedById: user9.id, followingId: user5.id },
      { followedById: user9.id, followingId: user6.id },
      { followedById: user9.id, followingId: user7.id },
      { followedById: user9.id, followingId: user8.id },
    ],
  });

  // Create posts by organization members
  await prisma.post.create({
    data: {
      title: 'New post',
      content: '<h1>Start with a title</h1>',
      author: {
        connect: {
          id: user1.id,
        },
      },
    },
  });

  await prisma.tag.createMany({
    data: [
      { name: 'Maternal Health' },
      { name: 'Pediatrics' },
      { name: 'Orthopedics' },
      { name: 'Cardiology' },
      { name: 'Surgery' },
      { name: 'Nursing' },
      { name: 'Preventive Care' },
      { name: 'Patient Care' },
      { name: 'Healthcare' },
      { name: 'Medicine' },
      { name: 'Medical Education' },
    ],
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
