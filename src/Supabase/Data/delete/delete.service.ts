import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { Supabase } from '../../db/Supabase';
import { DatabaseType } from '../../types/supabaseType';

@Injectable()
export class DeleteService {
  private supabase: SupabaseClient<
    DatabaseType,
    'DATABASE_URL' | 'DATABASE_KEY',
    any
  >;

  constructor(private readonly supabaseService: Supabase) {
    this.supabase = this.supabaseService.getClient();
  }

  async deleteBookmake(
    token: string,
    title: string,
    link: string,
  ): Promise<{ type: string; error: string | null }> {
    const { data: user, error: userError } =
      await this.supabase.auth.getUser(token);

    const email = user?.user?.email;


    if (!email) {
      return {
        type: 'failed',
        error: 'not find user',
      };
    }

    const { data: updateData, error: updateError } = await this.supabase
      .from('bookmark')
      .delete()
      .eq('email', email)
      .eq('title', title)
      .eq('link', link);

    if (updateError) {
      return {
        type: 'failed',
        error: 'not find bookmark',
      };
    } else {
      return {
        type: 'Success',
        error: null,
      };
    }
  }
}
