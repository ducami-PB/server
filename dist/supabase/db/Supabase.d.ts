import { ConfigService } from '@nestjs/config';
import { DatabaseType } from '../types/supabaseType';
import { SupabaseClient } from '@supabase/supabase-js';
export declare class Supabase {
    private configService;
    private supabase;
    constructor(configService: ConfigService);
    getClient(): SupabaseClient<DatabaseType, "DATABASE_URL" | "DATABASE_KEY", any>;
}
