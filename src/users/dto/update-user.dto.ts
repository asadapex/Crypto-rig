import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ type: String, example: 'johndoe@gmail.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ type: String, example: 'StrongPass' })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({ type: String, example: 'John' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ type: String, example: 'Doe' })
  @IsString()
  @IsOptional()
  surname?: string;

  @ApiProperty({ type: String, example: '+998901234567' })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({ type: Number, example: 1 })
  @IsNumber()
  @IsOptional()
  verified?: 0 | 1;

  @ApiProperty({ type: Number, example: 0 })
  @IsNumber()
  @IsOptional()
  monthlyProfit?: number;

  @ApiProperty({ type: Number, example: 0 })
  @IsNumber()
  @IsOptional()
  balance?: number;

  @ApiProperty({ enum: UserRole, example: UserRole.USER })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
