import {
  Post,
  Body,
  UseGuards,
  Controller,
  Req,
  Get,
  Patch,
  Param,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { BuyVideoCardDto } from './dto/buy-video-card.dto';
import { AuthGuard } from 'src/jwtauth/jwtauth.guard';
import { Request } from 'express';
import { ApiBody } from '@nestjs/swagger';
import { RolesGuard } from 'src/role/role.guard';
import { Roles } from 'src/decorators/role-decorator';
import { UserRole } from '@prisma/client';
import { OrderCheckDto } from './dto/order-check.dto';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @UseGuards(AuthGuard)
  @Post('order')
  async buy(@Req() req: Request, @Body() data: BuyVideoCardDto) {
    const userId = req['user-id'];
    return this.storeService.buyCards(userId, data);
  }

  @UseGuards(AuthGuard)
  @Get('order')
  async myOrders(@Req() req: Request) {
    const userId = req['user-id'];
    return this.storeService.myOrders(userId);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Patch('admin/order/:id')
  async checkOrder(@Param('id') id: string, @Body() data: OrderCheckDto) {
    return this.storeService.checkOrder(id, data);
  }
}
