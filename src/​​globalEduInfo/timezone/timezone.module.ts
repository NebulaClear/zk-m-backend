import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeZoneController } from './timezone.controller';
import { TimeZoneService } from './timezone.service';
import { TimeZone } from './entities/timezone.entity';
import { CountryTimeZone } from '../country/entities/country-timezone.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TimeZone, CountryTimeZone])],
  controllers: [TimeZoneController],
  providers: [TimeZoneService],
  exports: [TimeZoneService],
})
export class TimeZoneModule {}
