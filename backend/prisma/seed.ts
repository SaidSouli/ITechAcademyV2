// to run this use this command : npx prisma db seed

import prisma from "../src/lib/prisma.js";
import { Role , Level } from "@prisma/client";
import bcrypt from "bcryptjs";

async function main() {
  
  await prisma.enrollment.deleteMany();
  await prisma.refreshToken.deleteMany();
  await prisma.course.deleteMany();
  await prisma.trainer.deleteMany();
  await prisma.user.deleteMany();

  // ---- Trainers ----
  const [houssem, amira, karim] = await Promise.all([
    prisma.trainer.create({
      data: {
        fullname: 'Houssem Ben Ali',
        bio: 'Senior TypeScript and Node.js developer with 8 years of experience.',
        photoUrl: '#',
      },
    }),
    prisma.trainer.create({
      data: {
        fullname: 'Amira Trabelsi',
        bio: 'Frontend engineer specialized in React and UI design systems.',
        photoUrl: '#',
      },
    }),
    prisma.trainer.create({
      data: {
        fullname: 'Karim Jlassi',
        bio: 'Backend architect focused on databases, PostgreSQL and API design.',
        photoUrl: '#',
      },
    }),
  ]);

  // ---- Courses ----
  await prisma.course.createMany({
    data: [
      {
        title: 'Prisma 101',
        description: 'Prisma for beginners: schema, migrations and queries.',
        price: 9.99,
        durationHours: 2,
        level: Level.BEGINNER,
        trainerId: houssem.id,
      },
      {
        title: 'Advanced TypeScript',
        description: 'Generics, conditional types, and type-safe patterns.',
        price: 49.99,
        durationHours: 10,
        level: Level.ADVANCED,
        trainerId: houssem.id,
      },
      {
        title: 'React from Scratch',
        description: 'Components, hooks, routing and state management.',
        price: 29.99,
        durationHours: 8,
        level: Level.INTERMEDIATE,
        trainerId: amira.id,
      },
      {
        title: 'PostgreSQL Essentials',
        description: 'Relational modeling, indexes and query optimization.',
        price: 19.99,
        durationHours: 6,
        level: Level.BEGINNER,
        trainerId: karim.id,
      },
    ],
  });

  // ---- Students ----
  const passwordHash = await bcrypt.hash('password123', 10);

  await prisma.user.createMany({
    data: [
      {
        email: 'student1@email.com',
        fullname: 'Said Souli',
        password: passwordHash,
        role: Role.USER,
      },
      {
        email: 'student2@email.com',
        fullname: 'Yasmine Gharbi',
        password: passwordHash,
        role: Role.USER,
      },
    ],
  });

  console.log('Seed completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });