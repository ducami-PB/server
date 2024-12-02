"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const Supabase_1 = require("./supabase/db/Supabase");
const auth_controller_1 = require("./supabase/auth/auth.controller");
const auth_service_1 = require("./supabase/auth/auth.service");
const create_controller_1 = require("./supabase/Data/create/create.controller");
const create_service_1 = require("./supabase/Data/create/create.service");
const get_controller_1 = require("./supabase/Data/get/get.controller");
const get_service_1 = require("./supabase/Data/get/get.service");
const config_1 = require("@nestjs/config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
        ],
        controllers: [auth_controller_1.AuthController, create_controller_1.CreateController, get_controller_1.GetController],
        providers: [auth_service_1.AuthService, create_service_1.CreateService, get_service_1.GetService, Supabase_1.Supabase],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map