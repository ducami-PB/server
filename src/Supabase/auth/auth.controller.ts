import { Body, Headers, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

import { ResponseStatus } from '../types/types';

@Controller('supabase')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 회원가입
  @Post('/signUp')
  async signUp(
    @Body()
    signUpData: {
      email: string;
      password: string;
      name: string;
      classNum: string;
    },
  ): Promise<ResponseStatus> {
    const { email, password, name, classNum } = signUpData;

    try {
      await this.authService.signUp(email, password, name, classNum);
      return { status: 'Success' }; // 성공 시 message는 생략
    } catch (error) {
      return {
        status: 'Failed',
        message: error.message, // 실패 시 message를 추가
      };
    }
  }

  // 로그인
  @Post('/signIn')
  async logIn(
    @Body() loginData: { email: string; password: string },
  ): Promise<{ accessToken: string; refreshToken: string; name: string }> {
    const { email, password } = loginData;

    try {
      const result = await this.authService.logIn(email, password);
      return result; // accessToken, refreshToken, name 반환
    } catch (error) {
      throw new Error(`Login failed: ${error.message}`);
    }
  }

  // 리프레시 토큰으로 액세스 토큰 재발급
  @Post('/get-refresh-token')
  async refreshToken(
    @Body() refreshData: { refreshToken: string },
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { refreshToken } = refreshData;

    try {
      const result = await this.authService.refreshToken(refreshToken);
      return result; // 새로운 accessToken, refreshToken 반환
    } catch (error) {
      throw new Error(`Token refresh failed: ${error.message}`);
    }
  }

  // 유저 정보 가져오기
  @Get('/getUser')
  async getUser(
    @Headers('Authorization') authorization: string,
  ): Promise<{ user: any }> {
    const token = authorization.replace('Bearer ', '');

    try {
      const result = await this.authService.getUser(token);
      return result; // 유저 정보 반환
    } catch (error) {
      throw new Error(`Get user failed: ${error.message}`);
    }
  }
}
