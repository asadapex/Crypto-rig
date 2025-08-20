import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { StatsService } from './stats.service';
import { CalculateInvestmentDto } from './calculate-investment.dto';

@Controller('admin/analytics')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('summary')
  async getSummary() {
    return this.statsService.getSummary();
  }

  @Get('top-users')
  async getTopUsers() {
    return this.statsService.getTopUsersByProfit();
  }

  @Get('product-stats')
  async getProductStats() {
    return this.statsService.getProductStats();
  }

  @Get('charts')
  async getCharts(@Query('from') from?: string, @Query('to') to?: string) {
    const fromDate = from ? new Date(from) : undefined;
    const toDate = to ? new Date(to) : undefined;
    return this.statsService.getCharts(fromDate, toDate);
  }

  @Post('calculate')
  async calculate(@Body() dto: CalculateInvestmentDto) {
    return this.statsService.calculateInvestment(dto);
  }
}
