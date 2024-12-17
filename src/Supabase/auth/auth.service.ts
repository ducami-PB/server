import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { Supabase } from '../db/Supabase';
import { DatabaseType } from '../types/SupabaseType';

@Injectable()
export class AuthService {
  private supabase: SupabaseClient<
    DatabaseType,
    'DATABASE_URL' | 'DATABASE_KEY',
    any
  >;

  constructor(private readonly supabaseService: Supabase) {
    this.supabase = this.supabaseService.getClient();
  }

  // 회원가입
  async signUp(
    email: string,
    password: string,
    name: string,
    classNum: string,
  ): Promise<any> {
    try {
      const { data, error } = await this.supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: { name: name, classNum: classNum },
        },
      });

      if (error) {
        console.error('Sign-up error:', error.message);
        throw new Error(`Sign-up failed: ${error.message}`);
      }

      return data;
    } catch (error) {
      throw new Error(`Sign-up Error: ${error.message}`);
    }
  }

  // 로그인
  async logIn(email: string, password: string): Promise<any> {
    try {
      const { data: authData, error: authError } =
        await this.supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (authError || !authData?.session) {
        throw new Error(
          `Authentication failed: ${authError?.message || 'Unknown error'}`,
        );
      }

      const { access_token, refresh_token } = authData.session;

      const { data: userInfo, error: userError } = await this.supabase
        .from('userinfo')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (userError) {
        throw new Error(`User info retrieval failed: ${userError.message}`);
      }

      return {
        accessToken: access_token,
        refreshToken: refresh_token,
        name: userInfo.username,
      };
    } catch (error: any) {
      console.error(error);
      throw new Error(`Login Error: ${error.message}`);
    }
  }

  //리프래쉬 토큰 재발급
  async refreshToken(refreshToken: string): Promise<any> {
    try {
      const { data: refreshData, error: refreshError } =
        await this.supabase.auth.refreshSession({
          refresh_token: refreshToken,
        });

      if (refreshError || !refreshData?.session) {
        throw new Error(
          `Refresh token failed: ${refreshError?.message || 'Unknown error'}`,
        );
      }

      const { access_token } = refreshData.session;

      return {
        accessToken: access_token,
      };
    } catch (error: any) {
      console.error('Refresh Token Error:', error.message);
      throw new Error(`Refresh Token Error: ${error.message}`);
    }
  }

  //유저정보
  async getUser(token: string): Promise<any> {
    const { data: user, error } = await this.supabase.auth.getUser(token);

    if (error) {
      throw new Error(`Get user failed: ${error.message}`);
    }

    return { user };
  }
}
