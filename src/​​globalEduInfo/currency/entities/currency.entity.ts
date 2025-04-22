import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { CountryCurrency } from '../../country/entities/country-currency.entity';

@Entity('Currency')
export class Currency {
  @PrimaryColumn({
    type: 'char',
    length: 3,
    comment: 'ISO 4217三位货币代码',
  })
  currency_code: string;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    comment: '货币正式名称',
  })
  currency_name: string;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: true,
    comment: '货币符号（如$）',
  })
  symbol: string;

  @OneToMany(() => CountryCurrency, (cc) => cc.currency)
  countryRelations: CountryCurrency[];

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: '创建时间',
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
