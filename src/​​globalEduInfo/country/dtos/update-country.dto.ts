import {
  IsOptional,
  IsString,
  IsNumber,
  IsDecimal,
  IsArray,
} from 'class-validator';

export class UpdateCountryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  capital?: string;

  @IsOptional()
  @IsNumber()
  population?: number;

  @IsOptional()
  @IsDecimal()
  area?: number;

  @IsOptional()
  @IsArray()
  currencies?: string[];

  @IsOptional()
  @IsString()
  primary_currency?: string;

  @IsOptional()
  @IsArray()
  languages?: string[];

  @IsOptional()
  @IsArray()
  official_languages?: string[];

  @IsOptional()
  @IsArray()
  timezones?: string[];
}
