import { Supabase } from '../../db/Supabase';
export declare class CreateService {
    private readonly supabaseService;
    private supabase;
    constructor(supabaseService: Supabase);
    createBookmake(token: string, name: string, link: string, memo: string): Promise<any>;
}
