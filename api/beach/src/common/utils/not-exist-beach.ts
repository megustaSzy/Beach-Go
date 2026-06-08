import { HttpStatus, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

export const notExistBeach = async (
  prisma: PrismaService['beach'],
  id: number,
  message: string,
) => {
  const data = await prisma.findUnique({
    where: { id },
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
