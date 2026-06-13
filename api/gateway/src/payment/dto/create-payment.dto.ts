import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsInt()
  bookingId!: number;

  @IsNotEmpty()
  @IsInt()
  amount!: number;

  @IsNotEmpty()
  @IsString()
  method!: string;
}
