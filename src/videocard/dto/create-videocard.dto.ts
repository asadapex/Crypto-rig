import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateVideocardDto {
  @ApiProperty({ type: String, example: 'Bitmain' })
  @IsString()
  manufacturer: string;

  @ApiProperty({ type: String, example: 'Antminer S19' })
  @IsString()
  model: string;

  @ApiProperty({ type: Number, example: 2020 })
  @IsNumber()
  release: number;

  @ApiProperty({ type: String, example: 'SHA-256' })
  @IsString()
  algorithm: string;

  @ApiProperty({ type: String, example: '82TH/s - 95TH/s' })
  @IsString()
  hashRate: string;

  @ApiProperty({ type: String, example: '34W per TH' })
  @IsString()
  powerEfficiency: string;

  @ApiProperty({ type: String, example: '2950W - 3250W' })
  @IsString()
  powerUsage: string;

  @ApiProperty({ type: String, example: 'BTC, BCH, and 70+ SHA-256 coins' })
  @IsString()
  supportedCoins: string;

  @ApiProperty({ type: String, example: 'RJ45 Etheret' })
  @IsString()
  network: string;

  @ApiProperty({ type: Number, example: 4 })
  @IsNumber()
  fans: number;

  @ApiProperty({ type: String, example: '5°C - 40°C' })
  @IsString()
  temperature: string;

  @ApiProperty({ type: String, example: '75 dB' })
  @IsString()
  noiseLevel: string;

  @ApiProperty({ type: String, example: '17 kg' })
  @IsString()
  weight: string;
}
