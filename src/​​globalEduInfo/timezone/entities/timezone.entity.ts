import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { CountryTimeZone } from '../../country/entities/country-timezone.entity';

@Entity('TimeZone')
export class TimeZone {
  @PrimaryColumn({
    type: 'varchar',
    length: 50,
    comment: 'IANA时区标识符（如Asia/Shanghai）',
  })
  timezone_id: string;

  @Column({
    type: 'varchar',
    length: 6,
    comment: 'UTC偏移量（如+08:00）',
  })
  utc_offset: string;

  @OneToMany(() => CountryTimeZone, (ctz) => ctz.timezone)
  countryAssociations: CountryTimeZone[];

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
