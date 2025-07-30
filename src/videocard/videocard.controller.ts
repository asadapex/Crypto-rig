import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { VideocardService } from './videocard.service';
import { CreateVideocardDto } from './dto/create-videocard.dto';
import { UpdateVideocardDto } from './dto/update-videocard.dto';
import { AuthGuard } from 'src/jwtauth/jwtauth.guard';
import { RolesGuard } from 'src/role/role.guard';
import { Roles } from 'src/decorators/role-decorator';
import { UserRole } from '@prisma/client';

@Controller('videocard')
export class VideocardController {
  constructor(private readonly videocardService: VideocardService) {}

  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
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

  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVideocardDto: UpdateVideocardDto,
  ) {
    return this.videocardService.update(id, updateVideocardDto);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videocardService.remove(id);
  }
}
