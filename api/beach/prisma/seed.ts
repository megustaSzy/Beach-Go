import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config();

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL as string,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const beaches = [
    {
      name: 'Pantai Gigi Hiu',
      description: 'Terkenal dengan gugusan batu karang tajam yang eksotis dan fotogenik.',
      location: 'Kelumbayan, Tanggamus, Lampung',
      ticketPrice: 20000,
      imageUrl: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62',
    },
    {
      name: 'Pantai Tanjung Setia',
      description: 'Surganya para peselancar dunia dengan ombak yang panjang dan menantang.',
      location: 'Krui, Pesisir Barat, Lampung',
      ticketPrice: 15000,
      imageUrl: 'https://images.unsplash.com/photo-1590418596645-31ce14fcb7bd',
    },
    {
      name: 'Pantai Mutun',
      description: 'Pantai berpasir putih yang sangat cocok untuk liburan keluarga dengan ombak yang tenang.',
      location: 'Padang Cermin, Pesawaran, Lampung',
      ticketPrice: 25000,
      imageUrl: 'https://images.unsplash.com/photo-1623861219766-1c0b96d92ec2',
    },
    {
      name: 'Pulau Pahawang',
      description: 'Kawasan wisata bahari yang menyuguhkan keindahan bawah laut luar biasa untuk snorkeling.',
      location: 'Punduh Pidada, Pesawaran, Lampung',
      ticketPrice: 50000,
      imageUrl: 'https://images.unsplash.com/photo-1605336637851-18e382875b1a',
    },
  ];

  for (const b of beaches) {
    const exists = await prisma.beach.findFirst({ where: { name: b.name } });
    if (!exists) {
      await prisma.beach.create({
        data: {
          name: b.name,
          description: b.description,
          location: b.location,
          ticketPrice: b.ticketPrice,
          imageUrl: b.imageUrl,
        },
      });
    }
  }
  
  console.log('Seeding completed: Created 3 beaches.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
