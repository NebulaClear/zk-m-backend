// src/core/country/country.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryController } from './countries.controller';
import { CountryService } from './countries.service';
import { Country } from './entities/country.entity';
import { CountryLanguage } from './entities/country-language.entity';
import { CountryCurrency } from './entities/country-currency.entity';
import { CountryTimeZone } from './entities/country-timezone.entity';
import { Language } from '../language/entities/language.entity';
import { Currency } from '../currency/entities/currency.entity';
import { TimeZone } from '../timezone/entities/timezone.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      // 主实体
      Country,

      // 关联实体
      Language,
      Currency,
      TimeZone,

      // 联合实体
      CountryLanguage,
      CountryCurrency,
      CountryTimeZone,
    ]),
  ],
  controllers: [CountryController],
  providers: [
    CountryService,
    // 如需可添加其他提供者...
  ],
  exports: [
    TypeOrmModule, // 导出TypeORM特性以便其他模块使用
    CountryService,
  ],
})
export class CountryModule {}
