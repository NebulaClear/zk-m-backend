import { IsString, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateLanguageDto {
  @IsNotEmpty()
  language_id: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  language_name: string;
}
