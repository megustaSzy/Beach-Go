import { Injectable } from '@nestjs/common';
import { paymentApi } from '../common/instances/payment.instance';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
  async create(createData: CreatePaymentDto) {
    const response = await paymentApi.post('/', createData);
    return response.data;
  }

  async findAll() {
    const response = await paymentApi.get('/');
    return response.data;
  }

  async findOne(id: number) {
    const response = await paymentApi.get(`/${id}`);
    return response.data;
  }

  async update(id: number, updateData: UpdatePaymentDto) {
    const response = await paymentApi.patch(`/${id}`, updateData);
    return response.data;
  }

  async remove(id: number) {
    const response = await paymentApi.delete(`/${id}`);
    return response.data;
  }
}
