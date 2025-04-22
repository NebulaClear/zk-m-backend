import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private configService: ConfigService,
  ) {}
  @Get()
  getUser(): any {
    console.log(this.configService.get('DB_HOST'));
    console.log(this.configService.get('DB_PORT'));
    console.log(this.configService.get('DB_USER'));
    console.log(this.configService.get('DB_PASSWORD'));
    console.log(this.configService.get('DB_NAME'));
    console.log(this.configService.get('DB_HOST'));
    console.log(this.configService.get('DB_HOST'));
    return this.userService.getUsers();
  }

  @Post()
  InsertUser() {
    return 'this.userService.InsertUser();';
  }
}
