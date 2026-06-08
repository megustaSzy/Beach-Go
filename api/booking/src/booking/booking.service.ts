import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { notExistBooking } from '../common/utils/not-exist-booking';
import { badResponseBooking } from '../common/utils/bad-response-booking';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { RESPONSE_MESSAGES } from '../common/constants/message.constant';

@Injectable()
export class BookingService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBookingDto: CreateBookingDto) {
    try {
      const data = await this.prisma.booking.create({
        data: {
          userId: createBookingDto.userId,
          beachId: createBookingDto.beachId,
          visitDate: new Date(createBookingDto.visitDate),
          status: createBookingDto.status || 'PENDING',
        },
      });

      return {
        success: true,
        message: RESPONSE_MESSAGES.SUCCESS_SAVE,
        metadata: {
          status: HttpStatus.CREATED,
        },
        data: data,
      };
    } catch (error) {
      return badResponseBooking(RESPONSE_MESSAGES.BAD_REQUEST_SAVE);
    }
  }

  async findAll() {
    const data = await this.prisma.booking.findMany({
      orderBy: {
        id: 'desc',
      },
    });

    if (data.length === 0) {
      throw new NotFoundException({
        success: false,
        message: RESPONSE_MESSAGES.NOT_FOUND_SAVE,
        metadata: {
          status: HttpStatus.NOT_FOUND,
          total_data: data.length,
        },
      });
    }

    return {
      success: true,
      message: RESPONSE_MESSAGES.FOUND_SAVE,
      metadata: {
        status: HttpStatus.OK,
        total_data: data.length,
      },
      data: data,
    };
  }

  async findOne(id: number) {
    try {
      await notExistBooking(this.prisma.booking, id, RESPONSE_MESSAGES.NOT_FOUND_SAVE);

      const data = await this.prisma.booking.findUnique({
        where: { id: id },
      });

      return {
        success: true,
        message: RESPONSE_MESSAGES.FOUND_SAVE,
        metadata: {
          status: HttpStatus.OK,
        },
        data: data,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      return badResponseBooking(RESPONSE_MESSAGES.BAD_REQUEST_SAVE);
    }
  }

  async update(id: number, updateBookingDto: UpdateBookingDto) {
    try {
      await notExistBooking(this.prisma.booking, id, RESPONSE_MESSAGES.NOT_FOUND_SAVE);

      if (Object.keys(updateBookingDto).length === 0) {
        throw new HttpException(
          'Tidak ada data yang diupdate',
          HttpStatus.BAD_REQUEST,
        );
      }

      const data = await this.prisma.booking.update({
        where: { id: id },
        data: {
          ...updateBookingDto,
          ...(updateBookingDto.visitDate && { visitDate: new Date(updateBookingDto.visitDate) })
        },
      });

      return {
        success: true,
        message: RESPONSE_MESSAGES.UPDATE_SAVE,
        metadata: {
          status: HttpStatus.OK,
        },
        data: data,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      return badResponseBooking(RESPONSE_MESSAGES.BAD_REQUEST_SAVE);
    }
  }

  async remove(id: number) {
    try {
      await notExistBooking(this.prisma.booking, id, RESPONSE_MESSAGES.NOT_FOUND_SAVE);

      await this.prisma.booking.delete({
        where: { id: id },
      });

      return {
        success: true,
        message: RESPONSE_MESSAGES.DELETE_SAVE,
        metadata: {
          status: HttpStatus.OK,
        },
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      return badResponseBooking(process.env.BAD_REQUEST_SAVE || 'Bad Request');
    }
  }
}
