import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL as string,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const users = [
    {
      name: 'Super Admin',
      email: 'superadmin@gmail.com',
      password: await bcrypt.hash('rahasia123', 10),
      notelp: '081234567890',
      role: 'SUPER_ADMIN',
    },
    {
      name: 'Admin',
      email: 'admin@gmail.com',
      password: await bcrypt.hash('rahasia123', 10),
      notelp: '081234567891',
      role: 'ADMIN',
    },
    {
      name: 'Regular User',
      email: 'user@gmail.com',
      password: await bcrypt.hash('rahasia123', 10),
      notelp: '081234567892',
      role: 'USER',
    },
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        name: u.name,
        email: u.email,
        password: u.password,
        notelp: u.notelp,
        role: u.role as any,
      },
    });
  }
  console.log('Seeding completed: Created 3 users.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
