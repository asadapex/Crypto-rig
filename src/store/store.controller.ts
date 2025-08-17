import {
  Post,
  Body,
  UseGuards,
  Controller,
  Req,
  Get,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { BuyVideoCardsDto } from './dto/buy-video-card.dto';
import { AuthGuard } from 'src/jwtauth/jwtauth.guard';
import { Request } from 'express';
import { RolesGuard } from 'src/role/role.guard';
import { Roles } from 'src/decorators/role-decorator';
import { OrderType, UserRole } from '@prisma/client';
import { OrderCheckDto } from './dto/order-check.dto';
import { OrderCreateDto } from './dto/order-create-dto';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @UseGuards(AuthGuard)
  @Post('order')
  async buy(@Req() req: Request, @Body() data: BuyVideoCardsDto) {
    return this.storeService.buyCards(req['user-id'], data, req);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Get('order')
  async orders() {
    return this.storeService.orders();
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Post('admin/order')
  async adminOrder(@Body() data: OrderCreateDto, @Req() req: Request) {
    return this.storeService.buyCards(data.userId, data, req);
  }


  @UseGuards(AuthGuard)
  @Patch('admin/order/:id')
  async checkOrder(@Param('id') id: string, @Body() data: OrderCheckDto) {
    return this.storeService.checkOrder(id, data);
  }


  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Delete('admin/order')
  async deleteAll() {
    return this.storeService.deleteAll();
  }
}
