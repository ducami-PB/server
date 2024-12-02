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
exports.GetService = void 0;
const common_1 = require("@nestjs/common");
const Supabase_1 = require("../../db/Supabase");
let GetService = class GetService {
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
        this.supabase = this.supabaseService.getClient();
    }
    async getList(token) {
        const { data: user, error: userError } = await this.supabase.auth.getUser(token);
        const email = user?.user?.email;
        const { data: list, error: listError } = await this.supabase.from('bookmark').select("*").eq("email", email);
        if (!listError) {
            return list;
        }
    }
};
exports.GetService = GetService;
exports.GetService = GetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Supabase_1.Supabase])
], GetService);
//# sourceMappingURL=get.service.js.map