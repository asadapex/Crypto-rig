import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Delete,
  Param,
} from '@nestjs/common';
import { AdminauthService } from './adminauth.service';
import { CreateAdminDto } from './dto/create-adminauth.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { AuthGuard } from 'src/jwtauth/jwtauth.guard';
import { Request } from 'express';
import { WithdrawReq } from './dto/withdraw-status.dto';

@Controller('admin')
export class AdminauthController {
  constructor(private readonly adminauthService: AdminauthService) {}

  @Post('register')
  create(@Body() createAuthDto: CreateAdminDto) {
    return this.adminauthService.create(createAuthDto);
  }

  @Post('login')
  login(@Body() createAuthDto: LoginAdminDto) {
    return this.adminauthService.login(createAuthDto);
  }

  @Get()
  findAll() {
    return this.adminauthService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  findMe(@Req() req: Request) {
    return this.adminauthService.findMe(req);
  }

  @Get('withdraw-req')
  withdrawReqView() {
    return this.adminauthService.withdrawReqView();
  }

  @Post('withdraw-req')
  withdrawReq(@Body() data: WithdrawReq) {
    return this.adminauthService.withdrawReq(data);
  }

  @Delete('delete-history:id')
  deleteHistory(@Param('id') id: string) {
    return this.adminauthService.deleteHistory(id);
  }
}
