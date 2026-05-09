import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';
import { notExistUser } from '../common/utils/not-exist-user';
import { badResponseUser } from '../common/utils/bad-response-user';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
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
