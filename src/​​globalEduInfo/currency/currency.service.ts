import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { Currency } from './entities/currency.entity';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { CountryCurrency } from '../country/entities/country-currency.entity';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(Currency)
    private readonly currencyRepo: Repository<Currency>,
    @InjectRepository(CountryCurrency)
    private readonly countryCurrencyRepo: Repository<CountryCurrency>,
  ) {}

  async createCurrency(dto: CreateCurrencyDto): Promise<Currency> {
    const existing = await this.currencyRepo.findOne({
      where: [
        { currency_code: dto.currency_code },
        { currency_name: dto.currency_name },
      ],
    });

    if (existing) {
      throw new ConflictException('Currency code or name already exists');
    }

    const currency = this.currencyRepo.create(dto);
    return this.currencyRepo.save(currency);
  }

  async findAll(
    options?: FindManyOptions<Currency>,
  ): Promise<[Currency[], number]> {
    return this.currencyRepo.findAndCount({
      ...options,
      order: { currency_name: 'ASC' },
    });
  }

  async findByCode(code: string): Promise<Currency> {
    const currency = await this.currencyRepo.findOne({
      where: { currency_code: code },
      relations: ['countryRelations.country'],
    });

    if (!currency) {
      throw new NotFoundException(`Currency ${code} not found`);
    }
    return currency;
  }

  async updateCurrency(
    code: string,
    dto: UpdateCurrencyDto,
  ): Promise<Currency> {
    const currency = await this.findByCode(code);
    const updated = this.currencyRepo.merge(currency, dto);
    return this.currencyRepo.save(updated);
  }

  async deleteCurrency(code: string): Promise<void> {
    // 检查是否有国家关联
    const relations = await this.countryCurrencyRepo.find({
      where: { currency_code: code },
    });

    if (relations.length > 0) {
      throw new BadRequestException(
        `Cannot delete currency used by ${relations.length} countries`,
      );
    }

    const result = await this.currencyRepo.delete(code);
    if (result.affected === 0) {
      throw new NotFoundException(`Currency ${code} not found`);
    }
  }

  async getCountriesUsingCurrency(
    code: string,
    page = 1,
    limit = 10,
  ): Promise<{ data: CountryCurrency[]; meta: any }> {
    const [data, total] = await this.countryCurrencyRepo.findAndCount({
      where: { currency_code: code },
      relations: ['country'],
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
}
