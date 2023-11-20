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
exports.MemberController = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const member_service_1 = require("./member.service");
const member_dto_1 = require("./member.dto");
const member_entity_1 = require("./member.entity");
let MemberController = class MemberController {
    constructor(memberService) {
        this.memberService = memberService;
    }
    async findAll() {
        return await this.memberService.findAll();
    }
    async findOne(id) {
        return await this.memberService.findOne(id);
    }
    async create(memberDto) {
        const member = (0, class_transformer_1.plainToInstance)(member_entity_1.MemberEntity, memberDto);
        return await this.memberService.create(member);
    }
    async update(id, memberDto) {
        const member = (0, class_transformer_1.plainToInstance)(member_entity_1.MemberEntity, memberDto);
        return await this.memberService.update(id, member);
    }
    async delete(id) {
        return await this.memberService.delete(id);
    }
};
exports.MemberController = MemberController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':memberId'),
    __param(0, (0, common_1.Param)('memberId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [member_dto_1.MemberDto]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':memberId'),
    __param(0, (0, common_1.Param)('memberId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, member_dto_1.MemberDto]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':memberId'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('memberId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], MemberController.prototype, "delete", null);
exports.MemberController = MemberController = __decorate([
    (0, common_1.Controller)('members'),
    __metadata("design:paramtypes", [member_service_1.MemberService])
], MemberController);
//# sourceMappingURL=member.controller.js.map