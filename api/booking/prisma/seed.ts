import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config();

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL as string,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const bookings = [
    {
      userId: 3, // Regular User
      beachId: 3, // Pantai Mutun
      visitDate: new Date('2027-01-01T00:00:00.000Z'),
      status: 'CONFIRMED' as const,
    },
    {
      userId: 3, // Regular User
      beachId: 4, // Pulau Pahawang
      visitDate: new Date('2026-11-15T00:00:00.000Z'),
      status: 'CANCELLED' as const,
    },
    {
      userId: 3, // Regular User
      beachId: 1, // Pantai Gigi Hiu
      visitDate: new Date('2026-12-25T00:00:00.000Z'),
      status: 'PENDING' as const,
    },
  ];

  for (const b of bookings) {
    const exists = await prisma.booking.findFirst({
      where: {
        userId: b.userId,
        beachId: b.beachId,
        visitDate: b.visitDate,
      },
    });

    if (!exists) {
      await prisma.booking.create({
        data: b,
      });
    }
  }

  console.log('Seeding completed: Created 4 bookings.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
