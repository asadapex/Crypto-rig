import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class VerifyAuthDto {
  @ApiProperty({ type: String, example: 'John' })
  @IsString()
  name: string;

  @ApiProperty({ type: String, example: 'Doe' })
  @IsString()
  surname: string;

  @ApiProperty({ type: String, example: '+998901234567' })
  @IsString()
  @Matches(/^\+998\d{9}$/, {
    message: 'phoneNumber must be a valid Uzbekistan number starting with +998',
  })
  phoneNumber: string;
}
