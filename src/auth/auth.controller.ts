import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Response,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/signup')
  async createUser(@Body() body: { name: string; password: string }) {
    const response =await this.authService.createUser(body.name, body.password);
    return response;
  }
  @Post('/login')
  async loginUser(
    @Body() body: { name: string; password: string },
   
  ) {
    const response = await this.authService.login(body.name, body.password);
    return response;
  }
}
