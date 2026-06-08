import { IsInt, IsNotEmpty, IsEnum, IsOptional, IsDateString } from 'class-validator';

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED'
}

export class CreateBookingDto {
  @IsNotEmpty()
  @IsInt()
  userId!: number;

  @IsNotEmpty()
  @IsInt()
  beachId!: number;

  @IsNotEmpty()
  @IsDateString()
  visitDate!: string;

  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;
}
