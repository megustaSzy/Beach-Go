import { BadRequestException, HttpStatus } from '@nestjs/common';

export const badResponseUser = (message: string) => {
  throw new BadRequestException({
    success: false,
    message: message,
    metadata: {
      status: HttpStatus.BAD_REQUEST,
    },
  });
};
