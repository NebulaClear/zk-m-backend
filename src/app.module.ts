// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UserModule], // isGlobal属性使config环境变量可以全局使用
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
