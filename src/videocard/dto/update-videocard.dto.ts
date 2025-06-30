import { PartialType } from '@nestjs/swagger';
import { CreateVideocardDto } from './create-videocard.dto';

export class UpdateVideocardDto extends PartialType(CreateVideocardDto) {}
