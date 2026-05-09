import { ConflictException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

export const checkConflictUser = async (
  prisma: PrismaService['user'],
  message: string,
  email: string,
  id?: number,
) => {
  const email_filter = email.toLowerCase().trim();

  const exist = await prisma.findFirst({
    where: {
      email: email_filter,

      ...(id ? { NOT: { id: id } } : undefined),
    },
  });

  if (exist) {
    throw new ConflictException({
      success: false,
      message: message,
      metadata: {
        status: HttpStatus.CONFLICT,
      },
    });
  }

  return email_filter;
};
