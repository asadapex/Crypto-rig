import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AdminauthService } from './adminauth.service';
import { CreateAdminDto } from './dto/create-adminauth.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { AuthGuard } from 'src/jwtauth/jwtauth.guard';
import { Request } from 'express';

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

  @UseGuards(AuthGuard)
  @Get('profile')
  findMe(@Req() req: Request) {
    return this.adminauthService.findMe(req);
  }
}
