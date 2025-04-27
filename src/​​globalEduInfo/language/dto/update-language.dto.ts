import { IsNotEmpty, IsString, MaxLength, IsOptional } from 'class-validator';

export class UpdateLanguageDto {
  @IsNotEmpty()
  language_id: string;

  @IsString()
  @MaxLength(50)
  @IsOptional()
  language_name?: string;
}
