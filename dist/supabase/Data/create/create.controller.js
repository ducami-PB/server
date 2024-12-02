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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const create_service_1 = require("./create.service");
let CreateController = class CreateController {
    constructor(createService) {
        this.createService = createService;
    }
    async create(data, authorization) {
        const { name, link, memo } = data;
        const token = authorization.substring('Bearer '.length);
        return this.createService.createBookmake(token, name, link, memo);
    }
};
exports.CreateController = CreateController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('Authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CreateController.prototype, "create", null);
exports.CreateController = CreateController = __decorate([
    (0, common_2.Injectable)(),
    (0, common_1.Controller)('supabase'),
    __metadata("design:paramtypes", [create_service_1.CreateService])
], CreateController);
//# sourceMappingURL=create.controller.js.map