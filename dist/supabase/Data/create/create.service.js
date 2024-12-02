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
exports.CreateService = void 0;
const common_1 = require("@nestjs/common");
const Supabase_1 = require("../../db/Supabase");
const axios_1 = require("axios");
const cheerio = require("cheerio");
const path = require("path");
let CreateService = class CreateService {
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
        this.supabase = this.supabaseService.getClient();
    }
    async createBookmake(token, name, link, memo) {
        const { data: user, error } = await this.supabase.auth.getUser(token);
        const response = await axios_1.default.get(link);
        const html = response.data;
        const $ = cheerio.loadBuffer(html);
        let imageSrc = $('meta[property="og:image"]').attr('content');
        if (!imageSrc) {
            imageSrc = $('img').first().attr('src');
        }
        if (imageSrc) {
            const { data, error } = await this.supabase.from('bookmark').insert({
                email: user?.user?.email,
                title: name,
                link: link,
                memo: memo,
                img: imageSrc,
            });
        }
        else {
            const filePath = path.join(process.cwd(), 'src', 'assets', 'self.png');
            if (filePath) {
                const { data, error } = await this.supabase.from('bookmark').insert({
                    email: user?.user?.email,
                    title: name,
                    link: link,
                    memo: memo,
                    img: filePath,
                });
            }
            else {
                this.supabase.from('bookmark').insert({
                    email: user?.user?.email,
                    title: name,
                    link: link,
                    memo: memo,
                    img: null,
                });
            }
        }
    }
};
exports.CreateService = CreateService;
exports.CreateService = CreateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Supabase_1.Supabase])
], CreateService);
//# sourceMappingURL=create.service.js.map