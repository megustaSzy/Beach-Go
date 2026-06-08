import { IsInt, IsEnum, IsOptional, IsDateString } from 'class-validator';
import { BookingStatus } from './create-booking.dto';

export class UpdateBookingDto {
  @IsOptional()
  @IsInt()
  userId?: number;

  @IsOptional()
  @IsInt()
  beachId?: number;

  @IsOptional()
  @IsDateString()
  visitDate?: string;

  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;
}
