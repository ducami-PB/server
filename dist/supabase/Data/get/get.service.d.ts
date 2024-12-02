import { Supabase } from '../../db/Supabase';
export declare class GetService {
    private readonly supabaseService;
    private supabase;
    constructor(supabaseService: Supabase);
    getList(token: string): Promise<any>;
}
