import { IsString, MaxLength, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCurrencyDto {
  @IsNotEmpty()
  currency_code: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  currency_name: string;

  @IsString()
  @MaxLength(10)
  @IsOptional()
  symbol?: string;
}
