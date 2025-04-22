import {
  IsISO31661Alpha2,
  IsString,
  IsNumber,
  IsDecimal,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateCountryDto {
  @IsISO31661Alpha2()
  country_id: string;

  @IsString()
  country_en_name: string;

  @IsString()
  country_ch_name: string;

  @IsString()
  country_logo?: string;

  @IsString()
  @IsOptional()
  country_capital?: string;

  @IsNumber()
  @IsOptional()
  country_population?: number;

  @IsDecimal()
  @IsOptional()
  country_area?: number;

  @IsString()
  @IsOptional()
  country_climate?: string;

  @IsString()
  @IsOptional()
  country_government_type?: string;

  @IsString()
  @IsOptional()
  country_description?: string;

  @IsNumber()
  @IsOptional()
  country_safety_rating?: number;

  @IsArray()
  @IsString({ each: true })
  currencies: string[];

  @IsString()
  primary_currency: string;

  @IsArray()
  @IsString({ each: true })
  languages: string[];

  @IsArray()
  @IsString({ each: true })
  official_languages: string[];

  @IsArray()
  @IsString({ each: true })
  timezones: string[];
}
