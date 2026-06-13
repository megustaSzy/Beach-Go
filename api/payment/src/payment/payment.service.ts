import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { notExistPayment } from '../common/utils/not-exist-payment';
import { badResponsePayment } from '../common/utils/bad-response-payment';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { RESPONSE_MESSAGES } from '../common/constants/message.constant';

@Injectable()
export class PaymentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPaymentDto: CreatePaymentDto) {
    try {
      const data = await this.prisma.payment.create({
        data: {
          bookingId: createPaymentDto.bookingId,
          amount: createPaymentDto.amount,
          method: createPaymentDto.method,
          status: 'PENDING',
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
      return badResponsePayment(RESPONSE_MESSAGES.BAD_REQUEST_SAVE);
    }
  }

  async findAll() {
    const data = await this.prisma.payment.findMany({
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
      await notExistPayment(this.prisma.payment, id, RESPONSE_MESSAGES.NOT_FOUND_SAVE);

      const data = await this.prisma.payment.findUnique({
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
      return badResponsePayment(RESPONSE_MESSAGES.BAD_REQUEST_SAVE);
    }
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    try {
      await notExistPayment(this.prisma.payment, id, RESPONSE_MESSAGES.NOT_FOUND_SAVE);

      if (Object.keys(updatePaymentDto).length === 0) {
        throw new HttpException(
          RESPONSE_MESSAGES.EMPTY_SAVE,
          HttpStatus.BAD_REQUEST,
        );
      }

      const data = await this.prisma.payment.update({
        where: { id: id },
        data: updatePaymentDto,
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
      return badResponsePayment(RESPONSE_MESSAGES.BAD_REQUEST_SAVE);
    }
  }

  async remove(id: number) {
    try {
      await notExistPayment(this.prisma.payment, id, RESPONSE_MESSAGES.NOT_FOUND_SAVE);

      await this.prisma.payment.delete({
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
      return badResponsePayment(RESPONSE_MESSAGES.BAD_REQUEST_SAVE);
    }
  }
}
