import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUsers() {
    return [
      {
        id: 1,
        name: 'John',
        email: 'john@gmail.com',
        password: '123456',
      },
      {
        id: 2,
        name: 'Jane',
        email: 'jane@gmail.com',
        password: '123456',
      },
    ];
  }
}
