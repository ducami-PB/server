import { Supabase } from '../db/Supabase';
export declare class AuthService {
    private readonly supabaseService;
    private supabase;
    constructor(supabaseService: Supabase);
    signUp(email: string, password: string, name: string, classNum: string): Promise<any>;
    logIn(email: string, password: string): Promise<string>;
    getuser(email: string, token: string): Promise<any>;
}
