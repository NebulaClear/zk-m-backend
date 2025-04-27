import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, FindOptionsWhere, FindManyOptions } from 'typeorm';
import { CreateCountryDto } from './dtos/create-country.dto';
import { UpdateCountryDto } from './dtos/update-country.dto';
import { Country } from './entities/country.entity';
import { Currency } from '../currency/entities/currency.entity';
import { Language } from '../language/entities/language.entity';
import { TimeZone } from '../timezone/entities/timezone.entity';
import { CountryCurrency } from './entities/country-currency.entity';
import { CountryLanguage } from './entities/country-language.entity';
import { CountryTimeZone } from './entities/country-timezone.entity';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepo: Repository<Country>,
    @InjectRepository(Currency)
    private readonly currencyRepo: Repository<Currency>,
    @InjectRepository(Language)
    private readonly languageRepo: Repository<Language>,
    @InjectRepository(TimeZone)
    private readonly timezoneRepo: Repository<TimeZone>,
  ) {}

  async create(dto: CreateCountryDto): Promise<Country> {
    const existing = await this.countryRepo.findOne({
      where: [
        { country_id: dto.country_id },
        { country_ch_name: dto.country_ch_name },
        { country_en_name: dto.country_en_name },
      ],
    });

    if (existing) {
      throw new ConflictException('Country ID or name already exists');
    }

    const country = this.countryRepo.create(dto);
    return this.countryRepo.manager.transaction(
      async (transactionalEntityManager) => {
        const savedCountry = await transactionalEntityManager.save(country);

        // 处理货币关系
        if (dto.currencies?.length) {
          const currencies = await this.currencyRepo.find({
            where: { currency_code: In(dto.currencies) },
          });
          await transactionalEntityManager.save(
            CountryCurrency,
            currencies.map((c) => ({
              country_id: savedCountry.country_id,
              currency_code: c.currency_code,
              is_primary: c.currency_code === dto.primary_currency,
            })),
          );
        }

        // 处理语言关系
        if (dto.languages?.length) {
          const languages = await this.languageRepo.find({
            where: { language_id: In(dto.languages) },
          });
          await transactionalEntityManager.save(
            CountryLanguage,
            languages.map((l) => ({
              country_id: savedCountry.country_id,
              language_id: l.language_id,
              // is_official: dto.official_languages?.includes(l.language_id),
            })),
          );
        }

        // 处理时区关系
        if (dto.timezones?.length) {
          const timezones = await this.timezoneRepo.find({
            where: { timezone_id: In(dto.timezones) },
          });
          await transactionalEntityManager.save(
            CountryTimeZone,
            timezones.map((t) => ({
              country_id: savedCountry.country_id,
              timezone_id: t.timezone_id,
            })),
          );
        }

        return this.getFullCountryDetails(savedCountry.country_id);
      },
    );
  }

  async findAll(
    options?: FindManyOptions<Country>,
  ): Promise<[Country[], number]> {
    return this.countryRepo.findAndCount({
      ...options,
      order: { country_ch_name: 'ASC' },
    });
  }

  async findOne(id: string, relations = true): Promise<Country> {
    const country = await this.countryRepo.findOne({
      where: { country_id: id },
      relations: relations
        ? ['currencies.currency', 'languages.language', 'timezones']
        : [],
    });

    if (!country) {
      throw new NotFoundException(`Country ${id} not found`);
    }
    return country;
  }

  async update(id: string, dto: UpdateCountryDto): Promise<Country> {
    const country = await this.findOne(id, false);
    const updated = this.countryRepo.merge(country, dto);

    return this.countryRepo.manager.transaction(
      async (transactionalEntityManager) => {
        await transactionalEntityManager.save(updated);

        // 处理关联更新逻辑（示例：货币更新）
        if (dto.currencies) {
          await transactionalEntityManager.delete(CountryCurrency, {
            country_id: id,
          });
          const currencies = await this.currencyRepo.find({
            where: { currency_code: In(dto.currencies) },
          });
          await transactionalEntityManager.save(
            CountryCurrency,
            currencies.map((c) => ({
              country_id: id,
              currency_code: c.currency_code,
              is_primary: c.currency_code === dto.primary_currency,
            })),
          );
        }

        return this.getFullCountryDetails(id);
      },
    );
  }

  async delete(id: string): Promise<void> {
    const result = await this.countryRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Country ${id} not found`);
    }
  }

  private async getFullCountryDetails(id: string): Promise<Country> {
    const country = await this.countryRepo.findOne({
      where: { country_id: id },
      relations: ['currencies.currency', 'languages.language', 'timezones'],
    });

    if (!country) {
      throw new NotFoundException(`Country ${id} details could not be loaded`);
    }

    return country;
  }

  // 高级查询方法
  async searchCountries(
    criteria: FindOptionsWhere<Country>,
    page = 1,
    limit = 10,
  ): Promise<{ data: Country[]; meta: any }> {
    const [data, total] = await this.countryRepo.findAndCount({
      where: criteria,
      skip: (page - 1) * limit,
      take: limit,
      relations: ['currencies', 'languages'],
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
}
