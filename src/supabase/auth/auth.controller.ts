//로그인 회원가입

import {
  Body,
  Headers,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
@Controller('supabase')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signUp')
  async signUp(
    @Body()
    signUpData: {
      email: string;
      password: string;
      name: string;
      classNum: string;
    },
  ): Promise<void> {
    const { email, password, name, classNum } = signUpData;

    await this.authService.signUp(email, password, name, classNum);
  }

  @Post('/login')
  async login(
    @Body() loginData: { email: string; password: string },
  ): Promise<string> {
    const { email, password } = loginData;
    return await this.authService.logIn(email, password);
  }

  @Get('/getUser')
  async getUser(
    @Body() data: { email : string },
    @Headers('Authorization') authorization: string, //Authorization
  ): Promise<string> {
    const { email } = data;
    const token = authorization.substring('Bearer '.length);
    return await this.authService.getuser(email, token);
  }
}
