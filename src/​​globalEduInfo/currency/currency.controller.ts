import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Currencies')
@Controller('currencies')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post()
  @ApiOperation({ summary: '创建新货币' })
  async create(@Body() dto: CreateCurrencyDto) {
    return this.currencyService.createCurrency(dto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有货币' })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    const [data, total] = await this.currencyService.findAll({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  @Get(':code')
  @ApiOperation({ summary: '获取货币详情' })
  async findOne(@Param('code') code: string) {
    return this.currencyService.findByCode(code);
  }

  @Get(':code/countries')
  @ApiOperation({ summary: '获取使用该货币的国家' })
  async getCountries(
    @Param('code') code: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.currencyService.getCountriesUsingCurrency(code, page, limit);
  }

  @Put(':code')
  @ApiOperation({ summary: '更新货币信息' })
  async update(@Param('code') code: string, @Body() dto: UpdateCurrencyDto) {
    return this.currencyService.updateCurrency(code, dto);
  }

  @Delete(':code')
  @ApiOperation({ summary: '删除货币' })
  async remove(@Param('code') code: string) {
    return this.currencyService.deleteCurrency(code);
  }
}
