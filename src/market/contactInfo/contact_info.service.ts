import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactInfo } from './contact_info.entity';
import { CreateContactInfoDto } from './contact_info.dto';

@Injectable()
export class ContactInfoService {
  constructor(
    @InjectRepository(ContactInfo)
    private readonly contactInfoRepository: Repository<ContactInfo>,
  ) {}

  async create(createDto: CreateContactInfoDto): Promise<ContactInfo> {
    const contactInfo = this.contactInfoRepository.create(createDto);
    return this.contactInfoRepository.save(contactInfo);
  }

  async findAll(): Promise<ContactInfo[]> {
    return this.contactInfoRepository.find({
      order: {
        created_at: 'DESC',
      },
    });
  }
}
