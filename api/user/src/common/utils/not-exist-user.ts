import { HttpStatus, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

// buat fungsi cek
export const notExistUser = async (
  prisma: PrismaService['user'],
  id: number,
  message: string,
) => {
  const data = await prisma.findUnique({
    where: {
      id: id,
    },
  });

  if (!data) {
    throw new NotFoundException({
      success: false,
      message: message,
      metadata: {
        status: HttpStatus.NOT_FOUND,
      },
    });
  }

  return data;
};
