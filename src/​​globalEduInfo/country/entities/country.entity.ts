// src/countries/entities/country.entity.ts
import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { CountryLanguage } from './country-language.entity';
import { CountryCurrency } from './country-currency.entity';
import { CountryTimeZone } from './country-timezone.entity';
// import { VisaInfo } from '../../visas/entities/visa-info.entity';

@Entity({ name: 'country' })
export class Country {
  @PrimaryColumn({
    type: 'char',
    length: 2,
    comment: 'ISO 3166-1两位国家代码',
  })
  country_id: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
    comment: '国家全称(英文)',
  })
  country_en_name: string;
  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
    comment: '国家全称(中文)',
  })
  country_ch_name: string;
  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
    comment: '国家logo',
  })
  country_logo: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
    comment: '首都名称',
  })
  country_capital: string;

  @Column({
    type: 'int',
    comment: '人口总数',
  })
  country_population: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    comment: '国土面积（平方公里）',
  })
  country_area: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    comment: '主要气候类型',
  })
  country_climate: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    comment: '政体类型',
  })
  country_government_type: string;

  @Column({
    type: 'text',
    nullable: true,
    comment: '国家简介',
  })
  country_description: string;

  @Column({
    type: 'tinyint',
    comment: '安全评级（1-5级）',
    unsigned: true,
  })
  country_safety_rating: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '记录创建时间',
  })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    comment: '最后更新时间',
  })
  updated_at: Date;

  // 关联关系
  @OneToMany(() => CountryLanguage, (cl) => cl.country)
  languages: CountryLanguage[];

  @OneToMany(() => CountryCurrency, (cc) => cc.country)
  currencies: CountryCurrency[];

  @OneToMany(() => CountryTimeZone, (ctz) => ctz.country)
  timezones: CountryTimeZone[];
}
