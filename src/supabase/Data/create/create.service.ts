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
    name: string,
    link: string,
    memo: string,
  ): Promise<any> {
    const { data: user, error } = await this.supabase.auth.getUser(token);
    const response = await axios.get(link);
    const html = response.data;
    const $ = cheerio.loadBuffer(html);
    let imageSrc = $('meta[property="og:image"]').attr('content');

    //웹 페이지에 처음이미지
    if (!imageSrc) {
      imageSrc = $('img').first().attr('src'); // 수정
    }
    if (imageSrc) {
      const { data, error } = await this.supabase.from('bookmark').insert({
        email: user?.user?.email,
        title: name,
        link: link,
        memo: memo,
        img: imageSrc,
      });
    } else {
      // 기본 이미지
      const filePath = path.join(process.cwd(), 'src', 'assets', 'self.png');
      if (filePath) {
        const { data, error } = await this.supabase.from('bookmark').insert({
          email: user?.user?.email,
          title: name,
          link: link,
          memo: memo,
          img: filePath,
        });
      } else {
        this.supabase.from('bookmark').insert({
          email: user?.user?.email,
          title: name,
          link: link,
          memo: memo,
          img: null,
        });
      }
    }
  }
}
