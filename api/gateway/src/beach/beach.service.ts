import { Injectable } from '@nestjs/common';
import { beachApi } from '../common/instances/beach.instance';
import { CreateBeachDto } from './dto/create-beach.dto';
import { UpdateBeachDto } from './dto/update-beach.dto';

@Injectable()
export class BeachService {
  async create(createData: CreateBeachDto) {
    const response = await beachApi.post('/', createData);
    return response.data;
  }

  async findAll() {
    const response = await beachApi.get('/');
    return response.data;
  }

  async findOne(id: number) {
    const response = await beachApi.get(`/${id}`);
    return response.data;
  }

  async update(id: number, updateData: UpdateBeachDto) {
    const response = await beachApi.patch(`/${id}`, updateData);
    return response.data;
  }

  async remove(id: number) {
    const response = await beachApi.delete(`/${id}`);
    return response.data;
  }
}
