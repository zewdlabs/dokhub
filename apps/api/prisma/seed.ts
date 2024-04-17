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
        fullName: 'Myshkin Smith',
        prefix: null,
        email: 'testadmin@gmail.com',
        password: await bcrypt.hash('admin123', 10),
        phone: '123-456-7890',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        refreshToken: null,
        occupation: 'Doctor',
        specialty: 'Cardiology',
        yearsOfExperience: 10,
        medicalLicenseNumber: 'ABC123XYZ',
        role: Role.SUADMIN,
      },
      {
        fullName: 'Brook Feleke',
        prefix: null,
        email: 'user@gmail.com',
        password: await bcrypt.hash('user123', 10),
        phone: '987-654-3210',
        bio: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        refreshToken: null,
        occupation: 'Nurse',
        specialty: 'Pediatrics',
        yearsOfExperience: 5,
        medicalLicenseNumber: 'DEF456UVW',
        role: Role.USER,
      },
      // Add more seed objects as needed
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
