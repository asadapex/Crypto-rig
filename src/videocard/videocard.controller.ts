import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VideocardService } from './videocard.service';
import { CreateVideocardDto } from './dto/create-videocard.dto';
import { UpdateVideocardDto } from './dto/update-videocard.dto';

@Controller('videocard')
export class VideocardController {
  constructor(private readonly videocardService: VideocardService) {}

  @Post()
  create(@Body() createVideocardDto: CreateVideocardDto) {
    return this.videocardService.create(createVideocardDto);
  }

  @Get()
  findAll() {
    return this.videocardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videocardService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVideocardDto: UpdateVideocardDto,
  ) {
    return this.videocardService.update(id, updateVideocardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videocardService.remove(id);
  }
}
