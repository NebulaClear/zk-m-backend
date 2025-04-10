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
    const db: string | undefined = this.configService.get('DB_HOST');
    console.log(db);
    return this.userService.getUsers();
  }

  @Post()
  InsertUser() {
    return 'this.userService.InsertUser();';
  }
}
