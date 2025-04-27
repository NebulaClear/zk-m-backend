import { IsNotEmpty, IsString, MaxLength, IsOptional } from 'class-validator';

export class UpdateCurrencyDto {
  @IsNotEmpty()
  currency_code: string;
  @IsString()
  @MaxLength(50)
  @IsOptional()
  currency_name?: string;

  @IsString()
  @MaxLength(10)
  @IsOptional()
  symbol?: string;
}
