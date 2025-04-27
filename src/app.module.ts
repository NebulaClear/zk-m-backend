// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from './user/user.entity';
import { ContactInfo } from './market/contactInfo/contact_info.entity';
import { Country } from './​​globalEduInfo/country/entities/country.entity';
import { CountryTimeZone } from './​​globalEduInfo/country/entities/country-timezone.entity';
import { CountryLanguage } from './​​globalEduInfo/country/entities/country-language.entity';
import { CountryCurrency } from './​​globalEduInfo/country/entities/country-currency.entity';
import { Currency } from './​​globalEduInfo/currency/entities/currency.entity';
import { Language } from './​​globalEduInfo/language/entities/language.entity';
import { TimeZone } from './​​globalEduInfo/timezone/entities/timezone.entity';
import { ContactInfoModule } from './market/contactInfo/contact_info.module';
import { UserModule } from './user/user.module';
import { CountryModule } from './​​globalEduInfo/country/countries.module';
import { CurrencyModule } from './​​globalEduInfo/currency/currency.module';
import { LanguageModule } from './​​globalEduInfo/language/language.module';
import { TimeZoneModule } from './​​globalEduInfo/timezone/timezone.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationOptions: {
        allowUnknown: true, // 允许未定义的字段
        abortEarly: false, // 不因空字段中断验证
      },
      isGlobal: true,
      validationSchema: Joi.object({
        // 验证数据库配置
        NODE_ENV: Joi.string().valid(
          'development',
          'production',
          'test',
          'provision',
        ),
        DB_PORT: Joi.number().default(3306),
        DB_HOST: Joi.string(),
        DB_USER: Joi.string().required(),
        // DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          type: 'mysql',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USER'),
          password: configService.get('DB_PASSWORD') || '',
          database: configService.get('DB_NAME'),
          entities: [
            UserEntity,
            ContactInfo,
            Country,
            CountryTimeZone,
            CountryLanguage,
            CountryCurrency,
            Currency,
            Language,
            TimeZone,
          ],
          // 同步本地的schema与数据库，初始化时使用。运行项目自动创建数据库表
          // synchronize: true,
          logging: ['error'], //  'query',
        }) as TypeOrmModuleOptions,
    }),
    UserModule,
    ContactInfoModule,
    CountryModule,
    CurrencyModule,
    LanguageModule,
    TimeZoneModule,
  ], // isGlobal属性使config环境变量可以全局使用
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
