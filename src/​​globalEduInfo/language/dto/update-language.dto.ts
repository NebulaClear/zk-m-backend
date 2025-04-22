import { IsString, MaxLength, IsOptional } from 'class-validator';

export class UpdateLanguageDto {
  @IsString()
  @MaxLength(50)
  @IsOptional()
  language_name?: string;
}
