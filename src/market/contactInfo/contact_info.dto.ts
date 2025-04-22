import { IsEnum, IsNotEmpty, IsPhoneNumber, Length } from 'class-validator';
import { Channel } from './contact_info.entity';

export class CreateContactInfoDto {
  @IsNotEmpty()
  @Length(2, 50)
  name: string;

  @IsNotEmpty()
  @IsPhoneNumber('CN') // 根据实际情况调整国家代码
  phone: string;

  @IsEnum(Channel)
  channel: Channel;
}
