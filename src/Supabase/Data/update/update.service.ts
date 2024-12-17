import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { Supabase } from '../../db/Supabase';
import { DatabaseType } from '../../types/supabaseType';

@Injectable()
export class UpdateService {
  private supabase: SupabaseClient<
    DatabaseType,
    'DATABASE_URL' | 'DATABASE_KEY',
    any
  >;

  constructor(private readonly supabaseService: Supabase) {
    this.supabase = this.supabaseService.getClient();
  }

  async updateBookmark(
    token: string,
    BeforeTitle: string,
    BeforeLink: string,
    afterTitle: string,
    afterLink: string,
  ): Promise<{ type: string; error: string | null }> {
    const { data: user, error: finduserError } =
      await this.supabase.auth.getUser(token);

    if (finduserError) {
      return {
        type: 'Failed',
        error: 'not find user',
      };
    }

    const email = user?.user?.email;

    if (!email) {
      return {
        type: 'Failed',
        error: 'not find email',
      };
    }

    const { data: updateData, error: updaeaError } = await this.supabase
      .from('bookmark')
      .update({ email: email, title: afterTitle, link: afterLink })
      .eq('email', email)
      .eq('title', BeforeTitle)
      .eq('link', BeforeLink);

    if (updaeaError) {
      return {
        type: 'Failed',
        error: '(not find bookmark) or (Failed update bookmark)',
      };
    }

    return {
      type: 'Success',
      error: null,
    };
  }
}
