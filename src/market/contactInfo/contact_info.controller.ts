import { Controller, Get, Post, Body } from '@nestjs/common';
import { ContactInfoService } from './contact_info.service';
import { CreateContactInfoDto } from './contact_info.dto';
import { ContactInfo } from './contact_info.entity';

@Controller('contact_info')
export class ContactInfoController {
  constructor(private readonly contactInfoService: ContactInfoService) {}

  @Post()
  create(@Body() createDto: CreateContactInfoDto): Promise<ContactInfo> {
    return this.contactInfoService.create(createDto);
  }

  @Get()
  findAll(): Promise<ContactInfo[]> {
    return this.contactInfoService.findAll();
  }
}
