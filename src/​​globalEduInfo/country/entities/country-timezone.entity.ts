// src/countries/entities/country-timezone.entity.ts
import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Country } from './country.entity';
import { TimeZone } from '../../timezone/entities/timezone.entity';

@Entity({ name: 'country_timeZone' })
export class CountryTimeZone {
  @PrimaryColumn({
    type: 'char',
    length: 2,
    comment: '国家代码',
  })
  country_id: string;

  @PrimaryColumn({
    type: 'varchar',
    length: 50,
    comment: '时区ID（IANA格式）',
  })
  timezone_id: string;

  // 国家关联
  @ManyToOne(() => Country, (country) => country.timezones, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'country_id' })
  country: Country;

  // 时区关联
  @ManyToOne(() => TimeZone, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'timezone_id' })
  timezone: TimeZone;
}
