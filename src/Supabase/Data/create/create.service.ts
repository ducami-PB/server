import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { Supabase } from '../../db/Supabase';
import { DatabaseType } from '../../types/supabaseType';

import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';

type Token = string | { access_token: string };

@Injectable()
export class CreateService {
  private supabase: SupabaseClient<
    DatabaseType,
    'DATABASE_URL' | 'DATABASE_KEY',
    any
  >;

  constructor(private readonly supabaseService: Supabase) {
    this.supabase = this.supabaseService.getClient();
  }

  async createBookmake(
    token: Token,
    title: string,
    link: string,
    memo: string,
  ): Promise<{ type: string; error: string | null | Error }> {
    if (typeof token !== 'string') {
      console.log('토큰이 객체로 전달됨', token);
      token = token?.access_token || '';
    }

    if (!token) {
      return {
        type: 'Failed',
        error: '토큰이 유효하지 않음',
      };
    }

    // Supabase에서 유저 정보를 가져옴
    const { data: user, error: finduserError } =
      await this.supabase.auth.getUser(token);

    if (finduserError) {
      console.log('해당하는 유저가 존재하지 않습니다', token);
      return {
        type: 'Failed',
        error: 'not find user',
      };
    }

    const email = user?.user?.email;

    // title 조건 확인
    const { data: titleMatch, error: titleError } = await this.supabase
      .from('bookmark')
      .select('*')
      .eq('title', title)
      .eq('email', email);

    // link 조건 확인
    const { data: linkMatch, error: linkError } = await this.supabase
      .from('bookmark')
      .select('*')
      .eq('link', link)
      .eq('email', email);

    // 요청 잘못
    if (titleError || linkError) {
      throw new Error('Unknown error');
    }

    // 이미 있는 북마크
    if (
      (titleMatch && titleMatch.length > 0) ||
      (linkMatch && linkMatch.length > 0)
    ) {
      throw new Error('이미 존재하는 북마크 입니다.');
    }

    console.log(link);
    const response = await axios.get(link);
    const html = response.data;
    const $ = cheerio.loadBuffer(html);
    let imageSrc = $('meta[property="og:image"]').attr('content');

    // 웹 페이지에 처음 이미지가 있다면 그것을 사용
    if (!imageSrc) {
      imageSrc = $('img').first().attr('src');
    }

    // 이미지가 존재하면, 해당 이미지를 저장하고 북마크 삽입
    if (imageSrc) {
      const { data, error } = await this.supabase.from('bookmark').insert({
        email: email,
        title: title,
        link: link,
        memo: memo,
        img: imageSrc,
      });

      return {
        type: 'Success',
        error: null,
      };
    } else {
      // 기본 이미지
      const filePath = path.join(process.cwd(), 'src', 'assets', 'self.png');
      if (filePath) {
        const { data, error } = await this.supabase.from('bookmark').insert({
          email: email,
          title: title,
          link: link,
          memo: memo,
          img: filePath,
        });
        return {
          type: 'Success',
          error: '1',
        };
      } else {
        this.supabase.from('bookmark').insert({
          email: email,
          title: title,
          link: link,
          memo: memo,
          img: null,
        });
        return {
          type: 'Success',
          error: '2',
        };
      }
    }
  }
}
