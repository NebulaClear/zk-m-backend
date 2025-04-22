import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageController } from './language.controller';
import { LanguageService } from './language.service';
import { Language } from './entities/language.entity';
import { CountryLanguage } from '../country/entities/country-language.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Language, CountryLanguage])],
  controllers: [LanguageController],
  providers: [LanguageService],
  exports: [LanguageService], // 导出服务供其他模块使用
})
export class LanguageModule {}
