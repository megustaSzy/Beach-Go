import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RESPONSE_MESSAGES } from '../common/constants/message.constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
  ) {}

  async register(registerDto: RegisterDto) {
    try {
      const baseUrl = process.env.USER_SERVICE_URL as string;
      const response = await firstValueFrom(
        this.httpService.post(baseUrl, registerDto)
      );
      return response.data;
    } catch (error) {
      const err = error as AxiosError<{ message?: string; statusCode?: number }>;
      throw new HttpException(
        err.response?.data?.message || err.response?.data || RESPONSE_MESSAGES.REGISTER_FAILED,
        err.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const baseUrl = process.env.USER_SERVICE_URL as string;
      const response = await firstValueFrom(
        this.httpService.get(`${baseUrl}/internal/email/${loginDto.email}`)
      );

      const user = response.data;

      const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException(RESPONSE_MESSAGES.INVALID_CREDENTIALS);
      }

      const payload = { sub: user.id, email: user.email, role: user.role };
      const access_token = await this.jwtService.signAsync(payload, { expiresIn: '15m' });
      const refresh_token = await this.jwtService.signAsync(payload, { expiresIn: '7d' });

      return {
        success: true,
        message: RESPONSE_MESSAGES.LOGIN_SUCCESS,
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          access_token,
          refresh_token,
        },
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new HttpException(RESPONSE_MESSAGES.INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED);
      }
      const err = error as AxiosError<{ message?: string; statusCode?: number }>;
      throw new HttpException(
        err.response?.data?.message || err.response?.data || RESPONSE_MESSAGES.INVALID_CREDENTIALS,
        err.response?.status || HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken);
      
      const newPayload = { sub: payload.sub, email: payload.email, role: payload.role };
      const access_token = await this.jwtService.signAsync(newPayload, { expiresIn: '15m' });
      const refresh_token = await this.jwtService.signAsync(newPayload, { expiresIn: '7d' });

      return {
        success: true,
        message: RESPONSE_MESSAGES.TOKEN_REFRESH_SUCCESS,
        data: {
          access_token,
          refresh_token,
        },
      };
    } catch (error) {
      throw new UnauthorizedException(RESPONSE_MESSAGES.INVALID_REFRESH_TOKEN);
    }
  }
}
