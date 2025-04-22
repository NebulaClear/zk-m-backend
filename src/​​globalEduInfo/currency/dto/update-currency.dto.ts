import { IsString, MaxLength, IsOptional } from 'class-validator';

export class UpdateCurrencyDto {
  @IsString()
  @MaxLength(50)
  @IsOptional()
  currency_name?: string;

  @IsString()
  @MaxLength(10)
  @IsOptional()
  symbol?: string;
}
