import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { Language } from './entities/language.entity';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { CountryLanguage } from '../country/entities/country-language.entity';

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(Language)
    private readonly languageRepo: Repository<Language>,
    @InjectRepository(CountryLanguage)
    private readonly countryLanguageRepo: Repository<CountryLanguage>,
  ) {}

  async createLanguage(dto: CreateLanguageDto): Promise<Language> {
    // 检查重复代码
    const existing = await this.languageRepo.findOne({
      where: [
        { language_id: dto.language_id },
        { language_name: dto.language_name },
      ],
    });

    if (existing) {
      throw new Error('Language code or name already exists');
    }

    const language = this.languageRepo.create(dto);
    return this.languageRepo.save(language);
  }

  async findAllLanguages(
    options?: FindManyOptions<Language>,
  ): Promise<[Language[], number]> {
    return this.languageRepo.findAndCount({
      order: { language_name: 'ASC' },
      ...options,
    });
  }

  async findLanguageByCode(
    code: string,
    withCountries = false,
  ): Promise<Language> {
    const relations = [];
    if (withCountries) {
      relations.push('countryAssociations.country');
    }

    const language = await this.languageRepo.findOne({
      where: { language_id: code },
      relations,
    });

    if (!language) {
      throw new NotFoundException(`Language ${code} not found`);
    }
    return language;
  }

  async updateLanguage(
    code: string,
    dto: UpdateLanguageDto,
  ): Promise<Language> {
    const language = await this.findLanguageByCode(code);
    const updated = this.languageRepo.merge(language, dto);
    return this.languageRepo.save(updated);
  }

  async deleteLanguage(code: string): Promise<void> {
    const result = await this.languageRepo.delete(code);
    if (result.affected === 0) {
      throw new NotFoundException(`Language ${code} not found`);
    }
  }

  async getCountriesUsingLanguage(code: string): Promise<CountryLanguage[]> {
    await this.findLanguageByCode(code); // 验证存在性

    return this.countryLanguageRepo.find({
      where: { language_id: code },
      relations: ['country'],
    });
  }
}
