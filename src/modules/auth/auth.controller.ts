import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: Record<string, string>) {
    return await this.authService.authentication(body);
  }

  @Post('/refresh-token')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() body: Record<string, string>) {
    return await this.authService.refreshToken(body);
  }

  @Get('/check-auth')
  @HttpCode(HttpStatus.OK)
  async checkAuthen(@Headers() headers: Record<string, string>) {
    return await this.authService.checkAuthen(headers['authorization']);
  }
}
