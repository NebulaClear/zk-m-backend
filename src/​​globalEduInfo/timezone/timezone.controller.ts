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
import { TimeZoneService } from './timezone.service';
import { CreateTimezoneDto } from './dto/create-timezone.dto';
import { UpdateTimezoneDto } from './dto/update-timezone.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('TimeZones')
@Controller('timezones')
export class TimeZoneController {
  constructor(private readonly tzService: TimeZoneService) {}

  @Post()
  @ApiOperation({ summary: '创建新时区' })
  async create(@Body() dto: CreateTimezoneDto) {
    return this.tzService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: '获取时区列表' })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.tzService.findAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取时区详情' })
  async findOne(@Param('id') id: string) {
    return this.tzService.findOne(id);
  }

  @Get(':id/countries')
  @ApiOperation({ summary: '获取使用时区的国家' })
  async getCountries(
    @Param('id') id: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.tzService.getCountriesByTimezone(id, page, limit);
  }

  @Get('search/by-offset')
  @ApiOperation({ summary: '按UTC偏移量搜索时区' })
  async searchByOffset(@Query('offset') offset: string) {
    return this.tzService.searchByOffset(offset);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新时区信息' })
  async update(@Param('id') id: string, @Body() dto: UpdateTimezoneDto) {
    return this.tzService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除时区' })
  async remove(@Param('id') id: string) {
    return this.tzService.delete(id);
  }
}
