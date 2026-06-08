import { IsInt, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateBeachDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsInt()
  ticketPrice?: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
