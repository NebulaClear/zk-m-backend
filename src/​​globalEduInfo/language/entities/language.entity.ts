// src/core/country/entities/language.entity.ts
import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { CountryLanguage } from '../../country/entities/country-language.entity';

@Entity('Language')
export class Language {
  // ISO 639-1 两位代码
  @PrimaryColumn({
    type: 'char',
    length: 2,
    comment: 'ISO 639-1两位字母语言代码',
  })
  language_id: string;

  // 语言名称（唯一约束在数据库层）
  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    comment: '正式语言名称',
  })
  language_name: string;

  // 与国家的关联关系（通过中间表）
  @OneToMany(
    () => CountryLanguage,
    (countryLanguage) => countryLanguage.language,
  )
  countryAssociations: CountryLanguage[];

  // 时间戳（可选，根据业务需求添加）
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
