import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { LanguageService } from './language.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Languages')
@Controller('languages')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Post()
  @ApiOperation({ summary: '创建新语言' })
  async create(@Body() dto: CreateLanguageDto) {
    return this.languageService.createLanguage(dto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有语言列表' })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    const [items, total] = await this.languageService.findAllLanguages({
      skip: (page - 1) * limit,
      take: limit,
    });
    return {
      data: items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  @Get(':code')
  @ApiOperation({ summary: '获取语言详细信息' })
  async findOne(
    @Param('code') code: string,
    @Query('withCountries') withCountries: boolean,
  ) {
    return this.languageService.findLanguageByCode(code, withCountries);
  }

  @Get(':code/countries')
  @ApiOperation({ summary: '获取使用该语言的国家列表' })
  async getCountries(@Param('code') code: string) {
    return this.languageService.getCountriesUsingLanguage(code);
  }

  @Patch(':code')
  @ApiOperation({ summary: '更新语言信息' })
  async update(@Param('code') code: string, @Body() dto: UpdateLanguageDto) {
    return this.languageService.updateLanguage(code, dto);
  }

  @Delete(':code')
  @ApiOperation({ summary: '删除语言' })
  async remove(@Param('code') code: string) {
    return this.languageService.deleteLanguage(code);
  }
}
