import { Controller, Get, HttpCode, HttpStatus, Headers } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/me')
  @HttpCode(HttpStatus.OK)
  async getMe(@Headers() headers: Record<string, string>) {
    return await this.userService.getUser(headers['authorization']);
  }
}
