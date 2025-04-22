import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactInfo } from './contact_info.entity';
import { ContactInfoService } from './contact_info.service';
import { ContactInfoController } from './contact_info.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ContactInfo])],
  controllers: [ContactInfoController],
  providers: [ContactInfoService],
})
export class ContactInfoModule {}
