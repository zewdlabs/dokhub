import { PrismaClient, Role, VerificationStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      name: 'Aiden Johnson',
      prefix: 'Dr',
      email: 'aiden.johnson@gmail.com',
      password: await bcrypt.hash('Aiden123&', 10),
      phone: '+251931612090',
      bio: 'Experienced surgeon specializing in orthopedics.',
      occupation: 'Surgeon',
      specialty: 'Orthopedics',
      yearsOfExperience: 15,
      medicalLicenseNumber: 'GHI789JKL',
      role: Role.USER,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Sophia Patel',
      prefix: null,
      email: 'sophia.patel@yahoo.com',
      password: await bcrypt.hash('Sophia123&', 10),
      phone: '555-987-6543',
      bio: "Passionate pediatrician dedicated to children's health.",
      occupation: 'Pediatrician',
      specialty: 'Pediatrics',
      yearsOfExperience: 8,
      medicalLicenseNumber: 'MNO012PQR',
      role: Role.CREATOR,
      verificationStatus: VerificationStatus.VERIFIED,
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: 'Elijah Chang',
      prefix: 'Dr.',
      email: 'elijah.chang@example.com',
      password: await bcrypt.hash('Elijah123&', 10),
      phone: '555-789-0123',
      bio: 'Skilled cardiologist with a focus on preventive care.',
      occupation: 'Cardiologist',
      specialty: 'Cardiology',
      yearsOfExperience: 12,
      medicalLicenseNumber: 'STU345VWX',
      role: Role.ADMIN,
      verificationStatus: VerificationStatus.VERIFIED,
    },
  });

  const user4 = await prisma.user.create({
    data: {
      name: 'Isabella Garcia',
      prefix: null,
      email: 'isabella.garcia@example.com',
      password: await bcrypt.hash('Isabella123&', 10),
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
      password: await bcrypt.hash('Oliver123&', 10),
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
      password: await bcrypt.hash('Emmawilson123&', 10),
      phone: '555-876-5432',
      bio: 'Experienced dermatologist specializing in skin health.',
      occupation: 'Dermatologist',
      specialty: 'Dermatology',
      yearsOfExperience: 14,
      medicalLicenseNumber: 'YZA678BCD',
      role: Role.USER,
      verificationStatus: VerificationStatus.REJECTED,
    },
  });

  const user7 = await prisma.user.create({
    data: {
      name: 'Liam Johnson',
      prefix: null,
      email: 'liam.johnson@example.com',
      password: await bcrypt.hash('Liamjonh123&', 10),
      phone: '555-234-5678',
      bio: 'Passionate psychiatrist dedicated to mental health.',
      occupation: 'Psychiatrist',
      specialty: 'Psychiatry',
      yearsOfExperience: 9,
      medicalLicenseNumber: 'EFG901HIJ',
      role: Role.USER,
      verificationStatus: VerificationStatus.PENDING,
    },
  });

  const user8 = await prisma.user.create({
    data: {
      name: 'Ava Davis',
      prefix: null,
      email: 'ava.davis@example.com',
      password: await bcrypt.hash('Avadavis123&', 10),
      phone: '555-789-0123',
      bio: 'Compassionate nurse committed to patient care.',
      occupation: 'Nurse',
      specialty: null,
      yearsOfExperience: 6,
      medicalLicenseNumber: null,
      role: Role.USER,
      verificationStatus: VerificationStatus.REVIEW,
    },
  });

  const user9 = await prisma.user.create({
    data: {
      name: 'Noah Martinez',
      prefix: null,
      email: 'noah.martinez@example.com',
      password: await bcrypt.hash('Noah123&', 10),
      phone: '555-987-6543',
      bio: 'Skilled neurologist specializing in brain and nervous system disorders.',
      occupation: 'Neurologist',
      specialty: 'Neurology',
      yearsOfExperience: 11,
      medicalLicenseNumber: 'KLM234NOP',
      role: Role.CREATOR,
      verificationStatus: VerificationStatus.VERIFIED,
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
    skipDuplicates: true,
  });

  // Create posts by organization members
  await prisma.post.create({
    data: {
      title: 'Shaping the Future of Maternal Health in Rwanda',
      content:
        '<h1 style="text-align: start"><strong>Shaping the Future of Maternal Health in Rwanda — Reach Digital Health and CIIC-HIN’s Transformative Partnership</strong></h1><p style="text-align: start"><em>Reach Digital Health (Reach), South Africa, and The Center for Impact, Innovation and Capacity Building in Health Information Systems and Nutrition (CIIC-HIN, “Seek-in”), Rwanda, are pleased to announce their strategic partnership aimed at advancing the Government of Rwanda’s targets and Sustainable Development Goals (SDGs) for improved maternal and newborn outcomes. Together, they will work towards strengthening Antenatal Care (ANC) services, empowering mothers, promoting healthy behaviors, and improving mental health outcomes.</em></p><p>The collaboration between <a target="_blank" rel="noopener ugc nofollow" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-0 py-0 az hk" href="https://www.reachdigitalhealth.org/">Reach</a> and <a target="_blank" rel="noopener ugc nofollow" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-0 py-0 az hk" href="https://ciichin.org/">CIIC-HIN</a> represents a significant milestone in achieving global healthcare objectives. By combining their expertise, technologies, and resources, the partners are committed to bridging maternal and newborn healthcare gaps, ultimately ensuring healthier outcomes for mothers and their babies in Rwanda.</p><img src="https://miro.medium.com/v2/resize:fit:1050/1*PIlFdbf2Ut1Ro3HAVZttGQ.jpeg" alt=""><p>Supplied by Reach</p><p>Reach’s proficiency lies in building people’s agency to optimize health and well-being, engaging pregnant and postpartum women on a large scale through mobile messaging platforms, personalized information, and connections to health services. By integrating its technology into existing national health infrastructure, Reach adopts a systems-level approach, facilitating long-term change.</p><p>Reach leverages its successful track record in digital health solutions, contributing valuable technical expertise to the partnership. The organization has led the design, development, and scale-up of the maternal, newborn and child health platform MomConnect South Africa in collaboration with the South African government, showcasing its ability to create impactful digital platforms. MomConnect South Africa is a groundbreaking digital health initiative that provides pregnant women with prenatal, during and post-natal information and prioritizes maternal and child health using mobile phones.</p><img src="https://miro.medium.com/v2/resize:fit:1050/1*IZqEzDRo4tIHb9NGGGKTfA.jpeg" alt=""><p>CII-CHIN brings a wealth of expertise and experience to the partnership. With a team of medical doctors experienced in maternal and postpartum health research, providing valuable insights for effective interventions. Their deep understanding of the local context in Rwanda allows them to tailor the project to address the specific needs of pregnant and postpartum women in the country. The team’s research specialists ensure methodological rigor and data-driven decision-making, while their membership in a regional research network provides access to additional knowledge and collaborative opportunities.</p><blockquote><p><em>“The strategic partnership aligns with our vision for revolutionizing maternal health in Rwanda. The collaboration marks a pivotal step towards using technology to bridge the gap between research and policy.” Prof. Jeanine Condo, CIIC-HIN CEO</em></p></blockquote><p>In pursuit of their shared vision, Reach Digital Health and CIIC-HIN have prioritized understanding the needs of their target audience, specifically pregnant and postpartum women in Rwanda. Thorough user research and needs assessments will be conducted to adapt Reach Digital Health’s digital healthcare solutions to meet these women’s unique requirements and preferences effectively — enhancing the overall experience and engagement with the services provided.</p><blockquote><p><strong><em>“</em></strong><em>Our partnership will help us reach mothers in Rwanda with direct, comprehensive health support and guidance. This collaboration will ensure we reach the last mile and improve Antenatal Care compliance, uptake, and quality.” Debbie Rogers, Reach Digital Health CEO</em></p></blockquote><p>Recognizing the significance of financial support, the partners will also actively engage with potential funders and seek funding for the project’s implementation. Reach Digital Health and CIIC-HIN are establishing a network involving key stakeholders, including the Ministry of Health and other relevant parties, to ensure seamless collaboration and coordination.</p><p>Reach Digital Health and CIIC-HIN look forward to solidifying their partnership by leveraging previous baseline results and evidence to develop clear strategies, ensuring a broader impact on maternal and newborn health in Rwanda.</p>',
      description:
        'Reach Digital Health (Reach), South Africa, and The Center for Impact, Innovation and Capacity Building in Health Information Systems and Nutrition, Rwanda Collaboration',
      author: {
        connect: {
          id: user1.id,
        },
      },
    },
  });

  await prisma.post.create({
    data: {
      title:
        'Reflecting on Maternal Health Month: Empowering Mothers, Saving Lives',
      content: `<img src="https://miro.medium.com/v2/resize:fit:1050/1*9i6JcDSozmEnYceTfb0rxg.png" alt=""><p style="text-align: start">Maternal Health Month serves as a poignant reminder of the importance of ensuring the well-being and safety of expectant mothers worldwide. Throughout this month, numerous initiatives, campaigns, and discussions have shed light on the challenges pregnant women face, the progress made in maternal healthcare, and the work that remains to be done. As the HIT Like A. Girl Pod concludes our Maternal Health Month activities, it is essential to reflect on the significance of this global effort and highlight the path forward.</p><h1><strong>Celebrating Progress and Addressing Remaining Challenges</strong></h1><p style="text-align: start">Maternal Health Month has raised awareness, fostered collaboration, and ignited action to improve maternal health outcomes. It has showcased the remarkable progress in reducing maternal mortality rates, expanding access to essential healthcare services, and empowering mothers worldwide. However, it has also reminded us of the persistent challenges that continue to hamper maternal health.</p><p style="text-align: start">One of the key achievements worth celebrating is the significant reduction in global maternal mortality rates over the past decades. This progress has resulted from collaborative efforts from governments, healthcare professionals, NGOs, and advocates who have worked tirelessly to address the underlying causes of maternal deaths. Increased access to prenatal care, skilled birth attendants, and emergency obstetric services has saved countless lives and brought hope to communities worldwide.</p><p style="text-align: start">Furthermore, Maternal Health Month has highlighted the importance of a holistic approach to maternal healthcare. It has emphasized the need to address social determinants of health, such as poverty, gender inequality, and limited education, which often contribute to adverse maternal health outcomes. Advocacy campaigns have called for improved healthcare infrastructure, better training for healthcare providers, and increased investments in maternal and reproductive health services.</p><p style="text-align: start">However, we must acknowledge that many challenges remain. Disparities in maternal health outcomes persist, particularly in marginalized and underserved communities. Limited access to quality healthcare, inadequate resources, and cultural barriers continue to pose significant obstacles to ensuring every woman has a safe and healthy pregnancy experience.</p><p style="text-align: start">Moving forward, building on the momentum generated by Maternal Health Month and sustaining the efforts beyond this dedicated period is crucial. Governments, policymakers, healthcare providers, and individuals must collaborate to prioritize maternal health, allocate adequate resources, and implement evidence-based strategies. This includes expanding access to comprehensive reproductive healthcare, promoting maternal education, strengthening health systems, and addressing social and economic factors that impact maternal health.</p><p style="text-align: start">By redoubling our commitment to maternal health, we can empower mothers, save lives, and create a future where every woman receives the care and support she deserves during pregnancy and childbirth. Maternal Health Month serves as a reminder that our collective actions can transform the lives of countless mothers and their families, and we must continue working towards a world where maternal health is a universal priority.</p><p style="text-align: start">As we conclude Maternal Health Month, let us carry the lessons learned, the achievements celebrated, and the challenges acknowledged into our ongoing efforts to ensure that every mother’s journey is safe, healthy, and supported. Together, we can make a lasting impact and create a world where no mother is left behind.</p>`,
      description:
        'Maternal Health Month serves as a poignant reminder of the importance of ensuring the well-being and safety of expectant mothers worldwide.',
      author: {
        connect: {
          id: user2.id,
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
