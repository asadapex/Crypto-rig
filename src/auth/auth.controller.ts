import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { VerifyAuthDto } from './dto/verify-auth.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/jwtauth/jwtauth.guard';
import { VdcardStatusDto } from './dto/vdcard-status.dto';
import { WithdrawDto } from './dto/withdraw.dto';
import { CollectUserBalanceDto } from './dto/collect-balance.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @UseGuards(AuthGuard)
  @Post('verify')
  verify(@Req() req: Request, @Body() data: VerifyAuthDto) {
    return this.authService.verify(req, data);
  }

  @Post('login')
  login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  findMe(@Req() req: Request) {
    return this.authService.findMe(req);
  }

  @UseGuards(AuthGuard)
  @Post('collect-balance')
  collectVideoCardBalance(
    @Req() req: Request,
    @Body() data: CollectUserBalanceDto,
  ) {
    return this.authService.collectUserBalance(req, data);
  }

  @UseGuards(AuthGuard)
  @Post('withdraw-request')
  withdrawBalance(@Req() req: Request, @Body() data: WithdrawDto) {
    return this.authService.withdrawBalance(req, data);
  }

  @UseGuards(AuthGuard)
  @Get('my-withdraw')
  myWithdraws(@Req() req: Request) {
    return this.authService.withdrawRequests(req);
  }

  @UseGuards(AuthGuard)
  @Post('status-change')
  statusUpdate(@Req() req: Request, @Body() data: VdcardStatusDto) {
    const userId = req['user-id'];
    return this.authService.updateStatus(userId, data);
  }
}
