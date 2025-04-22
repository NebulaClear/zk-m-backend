import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { TimeZone } from './entities/timezone.entity';
import { CreateTimezoneDto } from './dto/create-timezone.dto';
import { UpdateTimezoneDto } from './dto/update-timezone.dto';
import { CountryTimeZone } from '../country/entities/country-timezone.entity';

@Injectable()
export class TimeZoneService {
  constructor(
    @InjectRepository(TimeZone)
    private readonly tzRepo: Repository<TimeZone>,
    @InjectRepository(CountryTimeZone)
    private readonly countryTzRepo: Repository<CountryTimeZone>,
  ) {}

  async create(dto: CreateTimezoneDto): Promise<TimeZone> {
    const existing = await this.tzRepo.findOne({
      where: { timezone_id: dto.timezone_id },
    });

    if (existing) {
      throw new ConflictException('Timezone ID already exists');
    }

    const timezone = this.tzRepo.create(dto);
    return this.tzRepo.save(timezone);
  }

  async findAll(
    page = 1,
    limit = 10,
    options?: FindManyOptions<TimeZone>,
  ): Promise<{ data: TimeZone[]; meta: any }> {
    const [data, total] = await this.tzRepo.findAndCount({
      ...options,
      skip: (page - 1) * limit,
      take: limit,
      order: { timezone_id: 'ASC' },
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

  async findOne(id: string): Promise<TimeZone> {
    const tz = await this.tzRepo.findOne({
      where: { timezone_id: id },
      relations: ['countryAssociations.country'],
    });

    if (!tz) {
      throw new NotFoundException(`Timezone ${id} not found`);
    }
    return tz;
  }

  async update(id: string, dto: UpdateTimezoneDto): Promise<TimeZone> {
    const tz = await this.findOne(id);
    const updated = this.tzRepo.merge(tz, dto);
    return this.tzRepo.save(updated);
  }

  async delete(id: string): Promise<void> {
    // 检查国家关联
    const relations = await this.countryTzRepo.count({
      where: { timezone_id: id },
    });

    if (relations > 0) {
      throw new BadRequestException(
        `Cannot delete timezone used by ${relations} countries`,
      );
    }

    const result = await this.tzRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Timezone ${id} not found`);
    }
  }

  async getCountriesByTimezone(
    id: string,
    page = 1,
    limit = 10,
  ): Promise<{ data: CountryTimeZone[]; meta: any }> {
    const [data, total] = await this.countryTzRepo.findAndCount({
      where: { timezone_id: id },
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

  async searchByOffset(offset: string): Promise<TimeZone[]> {
    return this.tzRepo.find({
      where: { utc_offset: offset },
      order: { timezone_id: 'ASC' },
    });
  }
}
