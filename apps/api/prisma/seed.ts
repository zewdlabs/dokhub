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

  await prisma.user.create({
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

  await prisma.user.create({
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

  await prisma.user.create({
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

  // Create organization with members
  await prisma.organization.create({
    data: {
      name: "Saint Paul's Millenium Medical College",
      slug: 'spmmc',
      location: 'Gulele Sub-City, Addis Ababa, Ethiopia PO Box 1271',
    },
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
