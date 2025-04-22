// src/countries/entities/country-language.entity.ts
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Country } from './country.entity';
import { Language } from '../../language/entities/language.entity';

@Entity({ name: 'CountryLanguage' })
export class CountryLanguage {
  @PrimaryColumn({
    type: 'char',
    length: 2,
    comment: '国家代码',
  })
  country_id: string;

  @PrimaryColumn({
    type: 'char',
    length: 2,
    comment: '语言代码',
  })
  language_id: string;

  @Column({
    type: 'boolean',
    default: false,
    comment: '是否官方语言',
  })
  is_official: boolean;

  // 国家关联
  @ManyToOne(() => Country, (country) => country.languages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'country_id' })
  country: Country;

  // 语言关联
  @ManyToOne(() => Language, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'language_id' })
  language: Language;
}
