import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { CountryService } from './countries.service';
import { CreateCountryDto } from './dtos/create-country.dto';
import { UpdateCountryDto } from './dtos/update-country.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Countries')
@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  @ApiOperation({ summary: '创建新国家' })
  async create(@Body() dto: CreateCountryDto) {
    return this.countryService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: '获取国家列表' })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.countryService.searchCountries({}, page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取国家详细信息' })
  async findOne(@Param('id') id: string) {
    return this.countryService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新国家信息' })
  async update(@Param('id') id: string, @Body() dto: UpdateCountryDto) {
    return this.countryService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除国家' })
  async remove(@Param('id') id: string) {
    return this.countryService.delete(id);
  }

  @Get('search/by-currency')
  @ApiOperation({ summary: '按货币搜索国家' })
  async findByCurrency(@Query('currency') currencyCode: string) {
    return this.countryService.searchCountries({
      currencies: { currency_code: currencyCode },
    });
  }
}
