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

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const email_filter = await checkConflictUser(
      this.prisma.user,
      process.env.FAILED_SAVE!,
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
      message: process.env.SUCCESS_SAVE,
      metadata: {
        status: HttpStatus.CREATED,
      },
      data: data,
    };
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
        message: process.env.NOT_FOUND_SAVE,
        metadata: {
          status: HttpStatus.NOT_FOUND,
          total_data: data.length,
        },
      });
    }

    return {
      success: true,
      message: process.env.FOUND_SAVE,
      metadata: {
        status: HttpStatus.OK,
        total_data: data.length,
      },
      data: data,
    };
  }

  async findOne(id: number) {
    try {
      await notExistUser(this.prisma.user, id, process.env.NOT_FOUND_SAVE!);

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
        message: process.env.FOUND_SAVE,
        metadata: {
          status: HttpStatus.OK,
        },
        data: data,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      return badResponseUser(process.env.BAD_REQUEST_SAVE!);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      await notExistUser(this.prisma.user, id, process.env.NOT_FOUND_SAVE!);

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
        message: process.env.UPDATE_SAVE,
        metadata: {
          status: HttpStatus.OK,
        },
        data: data,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      return badResponseUser(process.env.BAD_REQUEST_SAVE!);
    }
  }

  async remove(id: number) {
    try {
      await notExistUser(this.prisma.user, id, process.env.NOT_FOUND_SAVE!);

      await this.prisma.user.delete({
        where: {
          id: id,
        },
      });

      return {
        success: true,
        message: process.env.DELETE_SAVE,
        metadata: {
          status: HttpStatus.OK,
        },
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      return badResponseUser(process.env.BAD_REQUEST_SAVE!);
    }
  }
}
