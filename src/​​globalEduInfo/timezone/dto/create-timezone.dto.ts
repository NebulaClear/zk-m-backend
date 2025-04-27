import { IsNotEmpty, Matches, IsString } from 'class-validator';

export class CreateTimezoneDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z_]+-[A-Za-z_]+$/, {
    message: '无效的IANA时区格式（示例：Asia/Shanghai）',
  })
  timezone_id: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[+-]\d{2}:\d{2}$/, {
    message: '无效的UTC偏移格式（示例：+08:00）',
  })
  utc_offset: string;
}
