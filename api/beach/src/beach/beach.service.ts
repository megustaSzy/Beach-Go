import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { notExistBeach } from '../common/utils/not-exist-beach';
import { badResponseBeach } from '../common/utils/bad-response-beach';
import { CreateBeachDto } from './dto/create-beach.dto';
import { UpdateBeachDto } from './dto/update-beach.dto';
import { RESPONSE_MESSAGES } from '../common/constants/message.constant';

@Injectable()
export class BeachService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBeachDto: CreateBeachDto) {
    try {
      const data = await this.prisma.beach.create({
        data: createBeachDto,
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
      return badResponseBeach(RESPONSE_MESSAGES.BAD_REQUEST_SAVE);
    }
  }

  async findAll() {
    const data = await this.prisma.beach.findMany({
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
      await notExistBeach(this.prisma.beach, id, RESPONSE_MESSAGES.NOT_FOUND_SAVE);

      const data = await this.prisma.beach.findUnique({
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
      return badResponseBeach(RESPONSE_MESSAGES.BAD_REQUEST_SAVE);
    }
  }

  async update(id: number, updateBeachDto: UpdateBeachDto) {
    try {
      await notExistBeach(this.prisma.beach, id, RESPONSE_MESSAGES.NOT_FOUND_SAVE);

      if (Object.keys(updateBeachDto).length === 0) {
        throw new HttpException(
          'Tidak ada data yang diupdate',
          HttpStatus.BAD_REQUEST,
        );
      }

      const data = await this.prisma.beach.update({
        where: { id: id },
        data: updateBeachDto,
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
      return badResponseBeach(RESPONSE_MESSAGES.BAD_REQUEST_SAVE);
    }
  }

  async remove(id: number) {
    try {
      await notExistBeach(this.prisma.beach, id, RESPONSE_MESSAGES.NOT_FOUND_SAVE);

      await this.prisma.beach.delete({
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
      return badResponseBeach(RESPONSE_MESSAGES.BAD_REQUEST_SAVE);
    }
  }
}
