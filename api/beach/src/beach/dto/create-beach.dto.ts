import { IsInt, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateBeachDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsNotEmpty()
  @IsString()
  location!: string;

  @IsNotEmpty()
  @IsInt()
  ticketPrice!: number;

  @IsNotEmpty()
  @IsString()
  imageUrl!: string;
}
