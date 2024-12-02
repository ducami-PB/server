import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(signUpData: {
        email: string;
        password: string;
        name: string;
        classNum: string;
    }): Promise<void>;
    login(loginData: {
        email: string;
        password: string;
    }): Promise<string>;
    getUser(data: {
        email: string;
    }, authorization: string): Promise<string>;
}
