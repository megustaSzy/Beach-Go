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
    if (
      !createUserDto ||
      !createUserDto.name ||
      !createUserDto.email ||
      !createUserDto.password ||
      !createUserDto.notelp
    ) {
      throw new HttpException(process.env.EMPTY_SAVE!, HttpStatus.BAD_REQUEST);
    }

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
    });

    return {
      success: true,
      message: process.env.SUCCESS_SAVE,
      metadata: {
        status: HttpStatus.CREATED,
      },
      data: {
        id: data.id,
        name: data.name,
        email: data.email,
        notelp: data.notelp,
        role: data.role,
      },
    };
  }

  async findAll() {
    const data = await this.prisma.user.findMany();

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
      const data = await notExistUser(
        this.prisma.user,
        id,
        process.env.NOT_FOUND_SAVE!,
      );

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
      });

      return {
        success: true,
        message: process.env.UPDATE_SAVE,
        metadata: {
          status: HttpStatus.OK,
        },
        data: {
          id: data.id,
          name: data.name,
          email: data.email,
          notelp: data.notelp,
          role: data.role,
        },
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
