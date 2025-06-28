import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class VerifyAuthDto {
  @ApiProperty({ type: String, example: 'John' })
  @IsString()
  name: string;

  @ApiProperty({ type: String, example: 'Doe' })
  @IsString()
  surname: string;

  @ApiProperty({ type: String, example: '+998901234567' })
  @IsString()
  phoneNumber: string;
}
