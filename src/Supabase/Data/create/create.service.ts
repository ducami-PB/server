import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { Supabase } from '../../db/Supabase';
import { DatabaseType } from '../../types/supabaseType';

import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';

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
    token: string,
    title: string,
    link: string,
    memo: string,
  ): Promise<{ type: string; error: string | null | Error }> {
    const { data: user, error : finduserError } = await this.supabase.auth.getUser(token);

    if (finduserError) {
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

    // 이미 있는북마크
    if (
      (titleMatch && titleMatch.length > 0) ||
      (linkMatch && linkMatch.length > 0)
    ) {
      throw new Error('이미 존재하는 북마크 입니다.');
    }

    const response = await axios.get(link);
    const html = response.data;
    const $ = cheerio.loadBuffer(html);
    let imageSrc = $('meta[property="og:image"]').attr('content');

    //웹 페이지에 처음이미지
    if (!imageSrc) {
      imageSrc = $('img').first().attr('src');
    }
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
        error: '0',
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
