import { HttpException } from '@nestjs/common';
import axios, { AxiosError } from 'axios';

import { RESPONSE_MESSAGES } from '../constants/message.constant';

export const paymentApi = axios.create({
  baseURL: process.env.PAYMENT_SERVICE_URL as string,
  timeout: 5000,
});

paymentApi.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const message = error.response?.data;
    const status = error.response?.status;
    if (status && message) {
      throw new HttpException(message, status);
    }
    throw new HttpException(RESPONSE_MESSAGES.INTERNAL_ERROR, 500);
  },
);
