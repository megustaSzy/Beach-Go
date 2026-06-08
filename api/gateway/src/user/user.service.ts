import { Injectable } from '@nestjs/common';
import { userApi } from '../common/instances/user.instance';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  async findAll() {
    const response = await userApi.get('/');
    return response.data;
  }

  async findOne(id: number) {
    const response = await userApi.get(`/${id}`);
    return response.data;
  }

  async update(id: number, updateData: UpdateUserDto) {
    const response = await userApi.patch(`/${id}`, updateData);
    return response.data;
  }

  async remove(id: number) {
    const response = await userApi.delete(`/${id}`);
    return response.data;
  }
}
