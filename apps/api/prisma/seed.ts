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
  await prisma.post.createMany({
    data: [
      {
        title: `Enhancing Maternal Health in Ethiopia — The Mela(Mother) Initiative`,
        content: `<h1 style="text-align: start"><strong>Enhancing Maternal Health in Ethiopia — The Mela(Mother) Initiative</strong></h1><p style="text-align: start"></p><p style="text-align: start">Amanuel Tesfaye (Lead Writer)</p><p style="text-align: start"><em>“When my wife’s labor became complicated, I rushed her to the nearest health center. Unfortunately, the essential medications and equipment were unavailable, so I had to go and find them. She didn’t survive, and nobody explained why.</em>” — Mekonnen.</p><p style="text-align: start">This tragic story, shared in an interview, reflects the severe maternal health challenges in Ethiopia. Despite progress, Ethiopia's maternal mortality rate remains alarmingly high at <a target="_blank" rel="noopener ugc nofollow" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-0 py-0 az oj" href="https://www.dhsprogram.com/pubs/pdf/FR328/FR328.pdf">412 deaths per 100,000</a> live births according to the 2016 Ethiopia Demographic and Health Survey (2016 EDHS).</p><p style="text-align: start">The delay in receiving adequate care at health facilities, the third delay in the <a target="_blank" rel="noopener ugc nofollow" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-0 py-0 az oj" href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7580724/#:~:text=The%20Model%20identifies%20three%20critical,the%20facility%20(Third%20Delay).">Three Delays Model</a>, contributes significantly to maternal mortality and morbidity in Ethiopia. The <a target="_blank" rel="noopener ugc nofollow" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-0 py-0 az oj" href="https://www.who.int/news/item/25-06-2019-maternal-health-in-ethiopia-generating-information-for-action">Ethiopia Near Miss and Maternal Death Survey</a> revealed that intra-hospital care quality issues and delays in accessing adequate care are major contributors to maternal deaths. Women who overcome the first delay in deciding to seek care and the second delay caused by <a target="_blank" rel="noopener ugc nofollow" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-0 py-0 az oj" href="https://www.sciencedirect.com/science/article/pii/S2213398420302426">barriers to accessing health facilities</a> should not face further risks due to inadequate facility care.</p><img src="https://www.unicef.org/ethiopia/sites/unicef.org.ethiopia/files/styles/hero_desktop/public/2020-06/Ethiopia_0.jpg?itok=mzBr4Yth" alt=""><p><strong>Image credit: UNICEF Ethiopia</strong></p><p style="text-align: start">Thus, it is crucial to design and implement programs that equip health facilities to provide prompt and quality maternal health services, addressing all delays in the care process. This approach will improve maternal health outcomes and accelerate progress towards the Sustainable Development Goal <a target="_blank" rel="noopener ugc nofollow" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-0 py-0 az oj" href="https://www.who.int/data/gho/data/themes/topics/sdg-target-3-1-maternal-mortality"><strong>(SDG) 3.1 target</strong></a> — reducing the maternal mortality ratio to less than 70 deaths per 100,000 live births.</p><p style="text-align: start"><strong>Innovative healthcare financing solutions for maternal care</strong></p><p style="text-align: start">Enhancing health systems in Ethiopia requires innovative financing mechanisms to ensure universal access to quality maternal health services. The <a target="_blank" rel="noopener ugc nofollow" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-0 py-0 az oj" href="https://www.melaethiopia.org/">Mela(Mother) Initiative</a> aims to improve maternal care quality, reduce maternal mortality, and strengthen health systems across Ethiopia by focusing on:</p><ul><li><p>Providing financial support for facility operations through the <a target="_blank" rel="noopener ugc nofollow" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-0 py-0 az oj" href="https://abysiniahealthcredit.com">AbyssiniaHealthCredit</a> loan facility</p></li><li><p>Digitising health records via the HeliumEMR system</p></li><li><p>Building the capacity of clinical and administrative staff for improved service delivery</p></li><li><p>Creating demand and linking communities to health facilities for maternal services</p></li></ul><img src="https://www.unicef.org/ethiopia/sites/unicef.org.ethiopia/files/styles/hero_desktop/public/2020-06/Ethiopia_2.jpg?itok=bj4fx3-U" alt=""><p><strong>Image credit: UNICEF Ethiopia</strong></p><p style="text-align: start">Launched in 2023, the Mela(Mother) Initiative operates in Addis Ababa, Oromia, and Tigray regions, supported by a consortium of <a target="_blank" rel="noopener ugc nofollow" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-0 py-0 az oj" href="https://heliumhealth.com/">Helium Health</a>, the <a target="_blank" rel="noopener ugc nofollow" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-0 py-0 az oj" href="https://aciph.org/">Addis Continental Institute of Public Health (ACIPH)</a>, and <a target="_blank" rel="noopener ugc nofollow" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-0 py-0 az oj" href="https://maedotethiopia.org/">Maedot</a>. This initiative, spanning 200 selected health facilities over three years, is part of the <a target="_blank" rel="noopener ugc nofollow" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-0 py-0 az oj" href="https://saferchildbirthsystems.com/where-we-work">Safer Childbirth Systems Initiative</a> funded by <a target="_blank" rel="noopener ugc nofollow" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-0 py-0 az oj" href="https://msdfori.com/">Merck for Mothers</a>.</p><p style="text-align: start">The Mela(Mother) Initiative adopts a comprehensive approach to address maternal health by providing financial resources, technological support, capacity building, and community engagement to ensure timely and adequate maternal healthcare services in Ethiopia.</p><p style="text-align: start"><strong>Conclusion</strong></p><p style="text-align: start">By addressing the three delays model and ensuring health facilities are equipped and staffed to provide timely, quality maternal health services, the Mela(Mother) Initiative offers a promising pathway to reduce maternal mortality and improve maternal health outcomes in Ethiopia. This initiative embodies a crucial step towards achieving universal health coverage and the Sustainable Development Goals.</p>`,
        authorId: user1.id,
        publishedAt: new Date('2022-01-01'),
      },
      {
        title: `Improving Maternal Health in Ethiopia — The SafeBirth Initiative`,
        content: `<h1 style="text-align: start"><strong>Improving Maternal Health in Ethiopia — The SafeBirth Initiative</strong></h1><p style="text-align: start"></p><p style="text-align: start">Selam Asfaw (Lead Writer)</p><p style="text-align: start"><em>“When I went into labor, the road to the nearest clinic was impassable due to heavy rains. I gave birth at home without any medical assistance. Thankfully, my baby and I survived, but the fear of complications haunted me.”</em> — Almaz.</p><p style="text-align: start">Almaz’s story underscores the persistent challenges facing maternal health in Ethiopia, where geographical barriers and inadequate infrastructure significantly hinder access to essential healthcare. Despite progress, Ethiopia's maternal mortality rate is still high at <a target="_blank" rel="noopener ugc nofollow" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-0 py-0 az oj" href="https://www.dhsprogram.com/pubs/pdf/FR328/FR328.pdf">412 deaths per 100,000</a> live births according to the 2016 Ethiopia Demographic and Health Survey (2016 EDHS).</p><p style="text-align: start">The second delay in the <a target="_blank" rel="noopener ugc nofollow" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-0 py-0 az oj" href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7580724/#:~:text=The%20Model%20identifies%20three%20critical,the%20facility%20(Third%20Delay).">Three Delays Model</a>—the delay in reaching healthcare facilities—plays a crucial role in maternal mortality and morbidity in Ethiopia. Remote and rural areas are particularly affected, where the lack of transport and poor road conditions make timely access to healthcare nearly impossible.</p><img src="https://www.unicef.org/ethiopia/sites/unicef.org.ethiopia/files/styles/hero_desktop/public/2020-06/Ethiopia_0.jpg?itok=mzBr4Yth" alt=""><p><strong>Image credit: UNICEF Ethiopia</strong></p><p style="text-align: start">To address this critical issue, Ethiopia needs innovative and sustainable solutions that ensure all women, regardless of location, have access to quality maternal health services. The <a target="_blank" rel="noopener ugc nofollow" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-0 py-0 az oj" href="https://www.safebirthethiopia.org/">SafeBirth Initiative</a> aims to enhance maternal health by overcoming geographical barriers through:</p><ul><li><p>Establishing emergency transportation networks using ambulances and community-based transport solutions</p></li><li><p>Developing mobile health clinics to reach remote areas</p></li><li><p>Training community health workers to provide basic maternal care and emergency response</p></li><li><p>Implementing telemedicine services to connect rural health workers with specialists in urban centers</p></li></ul><img src="https://www.unicef.org/ethiopia/sites/unicef.org.ethiopia/files/styles/hero_desktop/public/2020-06/Ethiopia_1.jpg?itok=mzBr4Yth" alt=""><p><strong>Image credit: UNICEF Ethiopia</strong></p><p style="text-align: start">Launched in 2024, the SafeBirth Initiative operates in the Amhara and Afar regions, supported by a coalition of <a target="_blank" rel="noopener ugc nofollow" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-0 py-0 az oj" href="https://www.maternalhealthtaskforce.org/">Maternal Health Task Force</a>, the <a target="_blank" rel="noopener ugc nofollow" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-0 py-0 az oj" href="https://www.phis.et/">Public Health Institute of Ethiopia (PHIE)</a>, and <a target="_blank" rel="noopener ugc nofollow" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-0 py-0 az oj" href="https://www.path.org/">PATH</a>. This initiative is part of the broader <a target="_blank" rel="noopener ugc nofollow" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-0 py-0 az oj" href="https://globalmaternalsurvival.org/">Global Maternal Survival Campaign</a> funded by the <a target="_blank" rel="noopener ugc nofollow" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-0 py-0 az oj" href="https://gatesfoundation.org/">Bill & Melinda Gates Foundation</a>.</p><p style="text-align: start">The SafeBirth Initiative provides an innovative approach to tackling maternal health challenges in Ethiopia, ensuring that all women, irrespective of their location, have access to timely and quality maternal health services.</p><p style="text-align: start"><strong>Conclusion</strong></p><p style="text-align: start">By addressing the second delay in the Three Delays Model and enhancing healthcare accessibility in remote areas, the SafeBirth Initiative significantly improves maternal health outcomes in Ethiopia. This initiative marks a vital step towards achieving equitable health access and meeting the Sustainable Development Goals.</p>`,
        authorId: user2.id,
        publishedAt: new Date('2022-02-01'),
      },
      {
        title: `Empowering Midwives to Save Lives — The Ethiopia Midwife Support Project`,
        content: `<h1 style="text-align: start"><strong>Empowering Midwives to Save Lives — The Ethiopia Midwife Support Project</strong></h1><p style="text-align: start"></p><p style="text-align: start">Mulugeta Alemu (Lead Writer)</p><p style="text-align: start"><em>“During my last pregnancy, I went to the clinic, but there was only one midwife, and she was overwhelmed with patients. I had to wait for hours before receiving care.”</em> — Fatuma.</p><p style="text-align: start">Fatuma’s experience highlights the critical shortage of trained midwives in Ethiopia, a challenge that significantly impacts maternal health outcomes. Despite recent improvements, Ethiopia still faces a maternal mortality rate of <a target="_blank" rel="noopener ugc nofollow" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-0 py-0 az oj" href="https://www.dhsprogram.com/pubs/pdf/FR328/FR328.pdf">412 deaths per 100,000</a> live births according to the 2016 Ethiopia Demographic and Health Survey (2016 EDHS).</p><p style="text-align: start">The first delay in the <a target="_blank" rel="noopener ugc nofollow" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-0 py-0 az oj" href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7580724/#:~:text=The%20Model%20identifies%20three%20critical,the%20facility%20(Third%20Delay).">Three Delays Model</a>—the delay in deciding to seek care—plays a significant role in maternal mortality and morbidity in Ethiopia. Many women hesitate to seek timely medical help due to the perceived lack of skilled professionals and the fear of inadequate care.</p><img src="https://www.unicef.org/ethiopia/sites/unicef.org.ethiopia/files/styles/hero_desktop/public/2020-06/Ethiopia_2.jpg?itok=rP0ieB0X" alt=""><p><strong>Image credit: UNICEF Ethiopia</strong></p><p style="text-align: start">The Ethiopia Midwife Support Project aims to address this issue by enhancing the number and skills of midwives across the country. The project focuses on:</p><ul><li><p>Increasing the recruitment and training of midwives, particularly in rural and underserved areas</p></li><li><p>Providing continuous professional development and support for midwives</p></li><li><p>Equipping healthcare facilities with necessary tools and resources for safe deliveries</p></li><li><p>Creating a supportive network for midwives to share knowledge and best practices</p></li></ul><img src="https://www.unicef.org/ethiopia/sites/unicef.org.ethiopia/files/styles/hero_desktop/public/2020-06/Ethiopia_3.jpg?itok=rP0ieB0X" alt=""><p><strong>Image credit: UNICEF Ethiopia</strong></p><p style="text-align: start">Launched in 2023, the Ethiopia Midwife Support Project operates in the Oromia and SNNPR regions, supported by a coalition of the <a target="_blank" rel="noopener ugc nofollow" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-0 py-0 az oj" href="https://www.midwives.org/">International Confederation of Midwives</a>, the <a target="_blank" rel="noopener ugc nofollow" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-0 py-0 az oj" href="https://www.ephi.gov.et/">Ethiopian Public Health Institute</a>, and <a target="_blank" rel="noopener ugc nofollow" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-0 py-0 az oj" href="https://www.unfpa.org/">UNFPA</a>. This initiative is part of the <a target="_blank" rel="noopener ugc nofollow" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-0 py-0 az oj" href="https://globalmaternalsurvival.org/">Global Maternal Health Partnership</a> and is funded by the <a target="_blank" rel="noopener ugc nofollow" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-0 py-0 az oj" href="https://gatesfoundation.org/">Bill & Melinda Gates Foundation</a>.</p><p style="text-align: start">The Ethiopia Midwife Support Project provides a comprehensive approach to strengthening maternal health services by empowering midwives, who are often the primary caregivers during childbirth.</p><p style="text-align: start"><strong>Conclusion</strong></p><p style="text-align: start">By enhancing the skills and availability of midwives, the Ethiopia Midwife Support Project addresses the first delay in the Three Delays Model, encouraging more women to seek timely care and ultimately improving maternal health outcomes. This initiative is crucial for advancing the Sustainable Development Goals and ensuring that no woman dies while giving birth in Ethiopia.</p>`,
        authorId: user3.id,
        publishedAt: new Date('2022-03-01'),
      },
      {
        title: `Improving Maternal Health through Community Engagement`,
        content: `<h1 style="text-align: start"><strong>Improving Maternal Health through Community Engagement — The Ethiopia Safe Motherhood Initiative</strong></h1><p style="text-align: start"></p><p style="text-align: start">Selamawit Assefa (Lead Writer)</p><p style="text-align: start"><em>“When my sister went into labor, there was no transportation to get her to the nearest health facility. By the time we found a way to get her there, it was too late.”</em> — Mekdes.</p><p style="text-align: start">Mekdes’ story is a poignant reminder of the critical barriers to maternal health services in Ethiopia, where the maternal mortality rate stands at <a target="_blank" rel="noopener ugc nofollow" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-0 py-0 az oj" href="https://www.dhsprogram.com/pubs/pdf/FR328/FR328.pdf">412 deaths per 100,000</a> live births according to the 2016 Ethiopia Demographic and Health Survey (2016 EDHS). Many maternal deaths are preventable with timely access to care, but logistical and infrastructural challenges often hinder this.</p><p style="text-align: start">The Ethiopia Safe Motherhood Initiative aims to bridge these gaps through robust community engagement and infrastructure development. By focusing on the second delay in the <a target="_blank" rel="noopener ugc nofollow" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-0 py-0 az oj" href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7580724/#:~:text=The%20Model%20identifies%20three%20critical,the%20facility%20(Third%20Delay).">Three Delays Model</a>—the delay in reaching care—the initiative seeks to ensure that pregnant women can access health facilities promptly.</p><img src="https://www.unicef.org/ethiopia/sites/unicef.org.ethiopia/files/styles/hero_desktop/public/2020-06/Ethiopia_1.jpg?itok=4XwLJFmS" alt=""><p><strong>Image credit: UNICEF Ethiopia</strong></p><p style="text-align: start">The Ethiopia Safe Motherhood Initiative focuses on:</p><ul><li><p>Establishing and improving transportation networks to facilitate timely access to health facilities</p></li><li><p>Mobilizing community health workers to educate families about the importance of seeking timely maternal care</p></li><li><p>Setting up emergency communication systems in remote areas to quickly arrange transport</p></li><li><p>Building and equipping maternal waiting homes near health centers for high-risk pregnancies</p></li></ul><img src="https://www.unicef.org/ethiopia/sites/unicef.org.ethiopia/files/styles/hero_desktop/public/2020-06/Ethiopia_4.jpg?itok=PbR1Hz4F" alt=""><p><strong>Image credit: UNICEF Ethiopia</strong></p><p style="text-align: start">Launched in 2023, the Ethiopia Safe Motherhood Initiative operates in the Amhara and Tigray regions, supported by partnerships with the <a target="_blank" rel="noopener ugc nofollow" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-0 py-0 az oj" href="https://www.unicef.org/ethiopia/">UNICEF</a>, the <a target="_blank" rel="noopener ugc nofollow" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-0 py-0 az oj" href="https://www.moh.gov.et/">Ethiopian Ministry of Health</a>, and the <a target="_blank" rel="noopener ugc nofollow" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-0 py-0 az oj" href="https://www.who.int/">World Health Organization</a>. This initiative is part of the broader <a target="_blank" rel="noopener ugc nofollow" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-0 py-0 az oj" href="https://globalmaternalsurvival.org/">Global Maternal Survival Partnership</a> and receives funding from the <a target="_blank" rel="noopener ugc nofollow" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-0 py-0 az oj" href="https://gatesfoundation.org/">Bill & Melinda Gates Foundation</a>.</p><p style="text-align: start">The Ethiopia Safe Motherhood Initiative provides a holistic approach to addressing maternal health by ensuring that women can reach the care they need when they need it most.</p><p style="text-align: start"><strong>Conclusion</strong></p><p style="text-align: start">By focusing on transportation and community mobilization, the Ethiopia Safe Motherhood Initiative tackles the second delay in the Three Delays Model, facilitating quicker access to care and significantly improving maternal health outcomes. This initiative is vital for achieving the Sustainable Development Goals and ensuring no woman dies while giving birth in Ethiopia.</p>`,
        authorId: user4.id,
        publishedAt: new Date('2022-04-01'),
      },
      {
        title: `Empowering Midwives to Enhance Maternal Health in Ethiopia`,
        content: `<h1 style="text-align: start"><strong>Empowering Midwives to Enhance Maternal Health in Ethiopia — The Midwife Training Programme</strong></h1><p style="text-align: start"></p><p style="text-align: start">Muluwork Tekle (Lead Writer)</p><p style="text-align: start"><em>“When I went into labor, the midwife's calmness and expertise made all the difference. She handled complications with such grace and skill that my fear turned into relief.”</em> — Almaz.</p><p style="text-align: start">Almaz’s experience underscores the crucial role that well-trained midwives play in ensuring safe deliveries. In Ethiopia, where the maternal mortality rate is <a target="_blank" rel="noopener ugc nofollow" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-0 py-0 az oj" href="https://www.dhsprogram.com/pubs/pdf/FR328/FR328.pdf">412 deaths per 100,000</a> live births, the presence of skilled birth attendants is essential for reducing maternal mortality.</p><p style="text-align: start">The Midwife Training Programme is a comprehensive initiative aimed at enhancing the skills and knowledge of midwives across Ethiopia. By focusing on the first delay in the <a target="_blank" rel="noopener ugc nofollow" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-0 py-0 az oj" href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7580724/#:~:text=The%20Model%20identifies%20three%20critical,the%20facility%20(Third%20Delay).">Three Delays Model</a>—the delay in deciding to seek care—the programme ensures that midwives are well-prepared to handle childbirth complications and provide high-quality maternal care.</p><img src="https://www.unfpa.org/sites/default/files/styles/news_detail/public/news/Ethiopia_Midwife_training.jpg?itok=J_1-TOQy" alt=""><p><strong>Image credit: UNFPA Ethiopia</strong></p><p style="text-align: start">Key components of the Midwife Training Programme include:</p><ul><li><p>Providing advanced clinical training on managing obstetric emergencies</p></li><li><p>Equipping midwives with the latest knowledge in maternal and neonatal health care</p></li><li><p>Offering continuous professional development and mentorship</p></li><li><p>Integrating modern medical technologies and practices into midwifery</p></li></ul><img src="https://www.unfpa.org/sites/default/files/styles/news_detail/public/news/Ethiopia_Midwife_workshop.jpg?itok=J_1-TOQy" alt=""><p><strong>Image credit: UNFPA Ethiopia</strong></p><p style="text-align: start">Launched in 2022, the Midwife Training Programme is a joint effort by the <a target="_blank" rel="noopener ugc nofollow" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-0 py-0 az oj" href="https://www.moh.gov.et/">Ethiopian Ministry of Health</a> and the <a target="_blank" rel="noopener ugc nofollow" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-0 py-0 az oj" href="https://www.unfpa.org/">United Nations Population Fund (UNFPA)</a>, with support from the <a target="_blank" rel="noopener ugc nofollow" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-0 py-0 az oj" href="https://www.gatesfoundation.org/">Bill & Melinda Gates Foundation</a>. This initiative is part of the broader <a target="_blank" rel="noopener ugc nofollow" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-0 py-0 az oj" href="https://globalmaternalsurvival.org/">Global Maternal Survival Partnership</a>.</p><p style="text-align: start">The Midwife Training Programme aims to cover all regions in Ethiopia by 2025, enhancing the quality of maternal care across the country.</p><p style="text-align: start"><strong>Conclusion</strong></p><p style="text-align: start">By investing in the training and development of midwives, Ethiopia is taking significant steps towards reducing maternal mortality and improving overall maternal health outcomes. The Midwife Training Programme exemplifies a strategic approach to strengthening health systems, ensuring that no woman is left without skilled care during childbirth.</p>`,
        authorId: user5.id,
        publishedAt: new Date('2022-05-01'),
      },
    ],
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
