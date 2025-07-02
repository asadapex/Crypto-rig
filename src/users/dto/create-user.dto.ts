import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword, Min } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({ type: String, example: 'johndoe@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, example: 'Password123' })
  @IsString()
  password: string;
}
