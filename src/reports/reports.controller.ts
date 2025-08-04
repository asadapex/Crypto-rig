import {
  Controller,
  Get,
  Query,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { Workbook } from 'exceljs';
import { ApiQuery, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Reports')
@Controller('reports')
export class ReportsController {
  constructor(private prisma: PrismaService) {}

  @Get('monthly-profits')
  @ApiOperation({ summary: 'Export monthly profits to Excel' })
  @ApiQuery({ name: 'startYear', required: true, example: '2025' })
  @ApiQuery({ name: 'startMonth', required: true, example: '1' })
  @ApiQuery({ name: 'endYear', required: true, example: '2025' })
  @ApiQuery({ name: 'endMonth', required: true, example: '8' })
  @ApiResponse({
    status: 200,
    description: 'It will return the excel file of monthly profits',
    content: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
        schema: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async exportMonthlyProfits(
    @Query('startYear') startYear: string,
    @Query('startMonth') startMonth: string,
    @Query('endYear') endYear: string,
    @Query('endMonth') endMonth: string,
    @Res() res: Response,
  ) {
    if (!startYear || !startMonth || !endYear || !endMonth) {
      throw new BadRequestException('Missing required query parameters');
    }

    const startDate = new Date(Number(startYear), Number(startMonth) - 1, 1);
    const endDate = new Date(Number(endYear), Number(endMonth), 0, 23, 59, 59);

    const data = await this.prisma.monthlyProfits.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        user: true,
      },
      orderBy: {
        date: 'asc',
      },
    });

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Monthly Profits');

    worksheet.columns = [
      { header: 'User ID', key: 'userId', width: 36 },
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Email', key: 'email', width: 25 },
      { header: 'Phone', key: 'phone', width: 15 },
      { header: 'Date', key: 'date', width: 15 },
      { header: 'Profit', key: 'profit', width: 15 },
    ];

    for (const record of data) {
      worksheet.addRow({
        userId: record.user.id,
        name: `${record.user.name || ''} ${record.user.surname || ''}`,
        email: record.user.email,
        phone: record.user.phoneNumber,
        date: record.date.toISOString().split('T')[0],
        profit: record.profit,
      });
    }

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=monthly-profits-${startYear}-${startMonth}-to-${endYear}-${endMonth}.xlsx`,
    );

    await workbook.xlsx.write(res);
    res.end();
  }
}
