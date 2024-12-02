"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const Supabase_1 = require("../db/Supabase");
let AuthService = class AuthService {
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
        this.supabase = this.supabaseService.getClient();
    }
    async signUp(email, password, name, classNum) {
        try {
            let { data, error } = await this.supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        name: name,
                        classNum: classNum,
                    },
                },
            });
            if (error) {
                console.error('Error:', error.message);
                throw new Error(`Sign-up failed: ${error.message}`);
            }
            return data;
        }
        catch (error) {
            throw new Error(`Error : ${error.message}`);
        }
    }
    async logIn(email, password) {
        try {
            const { data: authData, error: authError } = await this.supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });
            if (authError || !authData?.user?.id) {
                throw new Error(`Authentication failed: ${authError?.message || 'Unknown error'}`);
            }
            if (authData) {
                const jwtToken = authData.session.access_token;
                return jwtToken;
            }
        }
        catch (error) {
            throw new Error(`Login error: ${error.message}`);
        }
    }
    async getuser(email, token) {
        const { data: user, error } = await this.supabase.auth.getUser(token);
        return {
            token: token,
            email: email,
            data: user,
            error: error
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Supabase_1.Supabase])
], AuthService);
//# sourceMappingURL=auth.service.js.map