import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // const initialPassword = 'password123';
  // const hashedPassword = await bcrypt.hash(initialPassword, 10);
  const roles = [Role.USER, Role.ADMIN, Role.CREATOR, Role.SUADMIN];
  const passwords = [
    'password123',
    'password234',
    'password345',
    'password456',
    'password567',
    'password678',
  ];
  let count = 0;
  const users = Array.from({ length: 5 }, async () => {
    // Generate a new hashed password for each user

    const newPassword = passwords[count];
    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    const randomRole = roles[Math.floor(Math.random() * roles.length)];
    count++;
    return {
      fullName: faker.name.fullName(),
      email: faker.internet.email(),
      password: newHashedPassword,
      phone: faker.phone.number(),
      bio: faker.lorem.sentence(),
      refreshToken: null,
      occupation: faker.name.jobTitle(),
      specialty: faker.lorem.word(),
      yearsOfExperience: faker.datatype.number({ min: 0, max: 20 }),
      medicalLicenseNumber: faker.random.alphaNumeric(9), // Assuming it's a 9-character alphanumeric string
      role: randomRole,
    };
  });

  // Add the generated users to the database
  await prisma.user.createMany({
    data: await Promise.all(users),
  });
  await prisma.user.createMany({
    data: [
      {
        fullName: 'Aiden Johnson',
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
        role: Role.USER,
      },
      {
        fullName: 'Sophia Patel',
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
        role: Role.ADMIN,
      },
      {
        fullName: 'Elijah Chang',
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
        role: Role.SUADMIN,
      },
      {
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
        role: Role.CREATOR,
      },
      // Add more seed objects as needed
    ],
  });
  const user1 = await prisma.user.create({
    data: {
      fullName: 'User 1',
      email: 'user1@example.com',
      password: 'password1',
      role: Role.ADMIN,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      fullName: 'User 2',
      email: 'user2@example.com',
      password: await bcrypt.hash('password2', 10),
      role: Role.CREATOR,
    },
  });

  await prisma.user.create({
    data: {
      fullName: 'User 3',
      email: 'user3@example.com',
      password: await bcrypt.hash('password3', 10),
    },
  });

  // Create organization with members
  await prisma.organization.create({
    data: {
      name: 'Organization 1',
      slug: 'org1',
      location: 'Location 1',
      members: {
        connect: [
          { id: user1.id }, // Connect user1 to the organization
          { id: user2.id }, // Connect user2 to the organization
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
      authorId: user1.id, // User 1 creates this post
    },
  });

  await prisma.post.create({
    data: {
      title: 'Post 2',
      content: 'Content of Post 2',
      published: true,
      authorId: user2.id, // User 2 creates this post
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
