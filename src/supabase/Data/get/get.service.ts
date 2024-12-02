import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { Supabase } from '../../db/Supabase';
import { DatabaseType } from '../../types/supabaseType';

@Injectable()
export class GetService {
  private supabase: SupabaseClient<
    DatabaseType,
    'DATABASE_URL' | 'DATABASE_KEY',
    any
  >;

  constructor(private readonly supabaseService: Supabase) {
    this.supabase = this.supabaseService.getClient();
  }

  async getList(token: string): Promise<any> {
    const {data : user, error: userError} = await this.supabase.auth.getUser(token);
    const email = user?.user?.email
    const {data: list, error:listError} = await this.supabase.from('bookmark').select("*").eq("email",email);
    if (!listError){
        return list;
    }
  }
}
