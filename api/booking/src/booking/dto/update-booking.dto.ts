import { IsInt, IsEnum, IsOptional, IsDateString } from 'class-validator';
export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED'
}

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
