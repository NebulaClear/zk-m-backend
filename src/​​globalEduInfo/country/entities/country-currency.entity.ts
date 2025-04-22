// src/countries/entities/country-currency.entity.ts
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Country } from './country.entity';
import { Currency } from '../../currency/entities/currency.entity';

@Entity({ name: 'CountryCurrency' })
export class CountryCurrency {
  // 复合主键配置
  @PrimaryColumn({
    type: 'char',
    length: 2,
    comment: 'ISO 3166-1两位国家代码',
  })
  country_id: string;

  @PrimaryColumn({
    type: 'char',
    length: 3,
    comment: 'ISO 4217三位货币代码',
  })
  currency_code: string;

  @Column({
    type: 'boolean',
    default: true,
    comment: '是否为主要流通货币',
  })
  is_primary: boolean;

  // 国家关联关系
  @ManyToOne(() => Country, (country) => country.currencies, {
    onDelete: 'CASCADE', // 级联删除配置
    orphanedRowAction: 'delete', // 孤儿记录自动删除
  })
  @JoinColumn({ name: 'country_id' })
  country: Country;

  // 货币关联关系
  @ManyToOne(() => Currency, (currency) => currency.countryRelations, {
    onDelete: 'CASCADE',
    eager: false, // 禁用自动加载（按需加载）
  })
  @JoinColumn({ name: 'currency_code' })
  currency: Currency;

  // 审计字段（可选，根据需求添加）
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
}
