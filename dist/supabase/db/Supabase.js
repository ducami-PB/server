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
exports.Supabase = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const supabase_js_1 = require("@supabase/supabase-js");
let Supabase = class Supabase {
    constructor(configService) {
        this.configService = configService;
        const supabaseUrl = this.configService.get('DATABASE_URL');
        const supabaseKey = this.configService.get('DATABASE_KEY');
        if (!supabaseUrl || !supabaseKey) {
            throw new Error('Supabase URL or key is missing');
        }
        this.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
    }
    getClient() {
        return this.supabase;
    }
};
exports.Supabase = Supabase;
exports.Supabase = Supabase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], Supabase);
//# sourceMappingURL=Supabase.js.map