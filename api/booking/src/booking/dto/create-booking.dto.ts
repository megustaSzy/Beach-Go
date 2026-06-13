import { IsInt, IsNotEmpty, IsDateString } from 'class-validator';

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
}
