import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BeachService } from './beach.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateBeachDto } from './dto/create-beach.dto';
import { UpdateBeachDto } from './dto/update-beach.dto';

@Controller('beach')
@UseGuards(JwtAuthGuard)
export class BeachController {
  constructor(private readonly beachService: BeachService) {}

  @Post()
  create(@Body() createData: CreateBeachDto) {
    return this.beachService.create(createData);
  }

  @Get()
  findAll() {
    return this.beachService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.beachService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: UpdateBeachDto) {
    return this.beachService.update(+id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.beachService.remove(+id);
  }
}
