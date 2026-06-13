import { IsEmail, IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @MinLength(6)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]+$/, {
    message: 'password must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  password!: string;

  @IsNotEmpty()
  @Matches(/^(\+62|62|0)8[1-9][0-9]{6,10}$/, {
    message: 'notelp must be a valid Indonesian phone number',
  })
  notelp!: string;
}
