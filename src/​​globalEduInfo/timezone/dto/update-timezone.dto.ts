import { IsOptional, IsString, Matches } from 'class-validator';

export class UpdateTimezoneDto {
  @IsOptional()
  @IsString()
  @Matches(/^[+-]\d{2}:\d{2}$/, {
    message: '无效的UTC偏移格式（示例：+08:00）',
  })
  utc_offset?: string;
}
