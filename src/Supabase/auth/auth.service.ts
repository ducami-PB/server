//로그인 회원가입 관련 장난질

import { Body, Injectable } from '@nestjs/common';

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
    this.supabase = this.supabaseService.getClient(); // 받아오고 바로 초기화
  }

  async signUp(
    email: string,
    password: string,
    name: string,
    classNum: string,
  ): Promise<any> {
    try {
      let { data, error } = await this.supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            name: name,
            classNum: classNum,
          },
        },
      });

      if (error) {
        console.error('Error:', error.message);
        throw new Error(`Sign-up failed: ${error.message}`);
      }

      return data;
    } catch (error) {
      throw new Error(`Error : ${error.message}`);
    }
  }

  async logIn(email: string, password: string): Promise<any> {
    try {
      // 1. 로그인 요청
      const { data: authData, error: authError } =
        await this.supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });

      // 2. 로그인 실패 처리
      if (authError || !authData?.user?.id) {
        throw new Error(
          `Authentication failed: ${authError?.message || 'Unknown error'}`,
        );
      }

      // 3. 로그인 성공
      if (authData) {
        const jwtToken = authData.session.access_token;

        // 사용자 이름 조회
        const { data: userInfo, error: userError } = await this.supabase
          .from('userinfo')
          .select('*')
          .eq('id', authData.user.id)
          .single(); // .single()을 사용하여 하나의 데이터만 반환하도록

        // 유저 정보 조회 에러 처리
        if (userError) {
          throw new Error(`User info retrieval failed: ${userError.message}`);
        }

        return {
          jwtToken: jwtToken,
          name: userInfo.username, // 사용자 이름 반환
        };
      }
    } catch (error: any) {
      // 4. 에러 처리
      console.error(error);
      throw new Error(`Login error: ${error.message}`);
    }
  }

  async getuser(email: string, token: string): Promise<any> {
    const { data: user, error } = await this.supabase.auth.getUser(token);
    return {
      token: token,
      email: email,
      data: user,
      error: error,
    };
  }
}
