import { Injectable } from '@nestjs/common';
import { bookingApi } from '../common/instances/booking.instance';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingService {
  async create(createData: CreateBookingDto) {
    const response = await bookingApi.post('/', createData);
    return response.data;
  }

  async findAll() {
    const response = await bookingApi.get('/');
    return response.data;
  }

  async findOne(id: number) {
    const response = await bookingApi.get(`/${id}`);
    return response.data;
  }

  async update(id: number, updateData: UpdateBookingDto) {
    const response = await bookingApi.patch(`/${id}`, updateData);
    return response.data;
  }

  async remove(id: number) {
    const response = await bookingApi.delete(`/${id}`);
    return response.data;
  }
}
