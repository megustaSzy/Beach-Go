import { Module } from '@nestjs/common';
import { BeachService } from './beach.service';
import { BeachController } from './beach.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [BeachController],
  providers: [BeachService, PrismaService],
})
export class BeachModule {}
