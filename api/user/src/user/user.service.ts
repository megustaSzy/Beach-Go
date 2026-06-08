import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { PrismaService } from '../prisma.service';

import { notExistUser } from '../common/utils/not-exist-user';
import { badResponseUser } from '../common/utils/bad-response-user';
import { checkConflictUser } from '../common/utils/check-conflict-user';
import { RESPONSE_MESSAGES } from '../common/constants/message.constant';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const email_filter = await checkConflictUser(
      this.prisma.user,
      RESPONSE_MESSAGES.FAILED_SAVE,
      createUserDto.email,
    );

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const data = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: email_filter,
        password: hashedPassword,
        notelp: createUserDto.notelp,
        role: 'USER',
      },
      select: {
        id: true,
        name: true,
        email: true,
        notelp: true,
        role: true,
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
  }

  async findByEmailInternal(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException({
        success: false,
        message: 'User not found',
      });
    }

    return user;
  }

  async findAll() {
    const data = await this.prisma.user.findMany({
      orderBy: {
        id: 'desc',
      },
      select: {
        id: true,
        name: true,
        email: true,
        notelp: true,
        role: true,
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
      await notExistUser(this.prisma.user, id, RESPONSE_MESSAGES.NOT_FOUND_SAVE);

      const data = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          notelp: true,
          role: true,
        },
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

      return badResponseUser(RESPONSE_MESSAGES.BAD_REQUEST_SAVE);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      await notExistUser(this.prisma.user, id, RESPONSE_MESSAGES.NOT_FOUND_SAVE);

      if (
        !updateUserDto.name &&
        !updateUserDto.password &&
        !updateUserDto.notelp
      ) {
        throw new HttpException(
          'Tidak ada data yang diupdate',
          HttpStatus.BAD_REQUEST,
        );
      }

      let hashedPassword: string | undefined;

      if (updateUserDto.password) {
        hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
      }

      const data = await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          ...(updateUserDto.name && {
            name: updateUserDto.name,
          }),

          ...(hashedPassword && {
            password: hashedPassword,
          }),

          ...(updateUserDto.notelp && {
            notelp: updateUserDto.notelp,
          }),
        },
        select: {
          id: true,
          name: true,
          email: true,
          notelp: true,
          role: true,
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

      return badResponseUser(RESPONSE_MESSAGES.BAD_REQUEST_SAVE);
    }
  }

  async remove(id: number) {
    try {
      await notExistUser(this.prisma.user, id, RESPONSE_MESSAGES.NOT_FOUND_SAVE);

      await this.prisma.user.delete({
        where: {
          id: id,
        },
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

      return badResponseUser(RESPONSE_MESSAGES.BAD_REQUEST_SAVE);
    }
  }
}
