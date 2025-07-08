import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { IsEmail, IsEnum, IsString } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ type: String, example: 'John' })
  @IsString()
  name: string;

  @ApiProperty({ type: String, example: 'johndoe@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, example: 'password123' })
  @IsString()
  password: string;

  @ApiProperty({ enum: UserRole, example: UserRole.ADMIN })
  @IsEnum(UserRole)
  role: UserRole;
}
