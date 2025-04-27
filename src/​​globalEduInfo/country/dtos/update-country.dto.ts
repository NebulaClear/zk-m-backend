import {
  IsOptional,
  IsString,
  IsNumber,
  IsDecimal,
  IsArray,
} from 'class-validator';
import { CountryLanguage } from '../entities/country-language.entity';
import { CountryCurrency } from '../entities/country-currency.entity';
import { CountryTimeZone } from '../entities/country-timezone.entity';

export class UpdateCountryDto {
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
  currencies: CountryCurrency[];

  @IsString()
  primary_currency: string;

  @IsArray()
  @IsString({ each: true })
  languages: CountryLanguage[];

  @IsArray()
  @IsString({ each: true })
  official_languages: CountryLanguage[];

  @IsArray()
  @IsString({ each: true })
  timezones: CountryTimeZone[];
}
