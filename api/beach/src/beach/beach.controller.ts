import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BeachService } from './beach.service';
import { CreateBeachDto } from './dto/create-beach.dto';
import { UpdateBeachDto } from './dto/update-beach.dto';

@Controller('beach')
export class BeachController {
  constructor(private readonly beachService: BeachService) {}

  @Post()
  create(@Body() createBeachDto: CreateBeachDto) {
    return this.beachService.create(createBeachDto);
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
  update(@Param('id') id: string, @Body() updateBeachDto: UpdateBeachDto) {
    return this.beachService.update(+id, updateBeachDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.beachService.remove(+id);
  }
}
