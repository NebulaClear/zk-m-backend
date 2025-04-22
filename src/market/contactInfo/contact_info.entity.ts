// import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

export enum Channel {
  WEB = 'WEB',
  APP = 'APP',
  WECHAT = 'WECHAT',
}

@Entity('contact_info')
export class ContactInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, nullable: false, default: '未命名' })
  name: string;

  @Column({ length: 20, nullable: false, default: '123' })
  @Index('idx_phone')
  phone: string;

  @Column({
    type: 'enum',
    enum: Channel,
    default: Channel.WEB,
  })
  channel: Channel;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
