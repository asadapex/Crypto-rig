import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginAdminDto {
  @ApiProperty({ type: String, example: 'johndoe@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, example: 'password123' })
  @IsString()
  password: string;
}
