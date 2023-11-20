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
exports.ClubMemberController = void 0;
const common_1 = require("@nestjs/common");
const club_member_service_1 = require("./club-member.service");
const member_entity_1 = require("../member/member.entity");
const class_transformer_1 = require("class-transformer");
let ClubMemberController = class ClubMemberController {
    constructor(memberClubService) {
        this.memberClubService = memberClubService;
    }
    async addMemberToClub(memberId, clubId) {
        return await this.memberClubService.addMemberToClub(memberId, clubId);
    }
    async findMembersFromClub(id) {
        return await this.memberClubService.findMembersFromClub(id);
    }
    async findMemberFromClub(memberId, clubId) {
        return await this.memberClubService.findMemberFromClub(memberId, clubId);
    }
    async updateMembersFromClub(clubId, membersDTO) {
        const members = (0, class_transformer_1.plainToInstance)(member_entity_1.MemberEntity, membersDTO);
        return await this.memberClubService.updateMembersFromClub(members, clubId);
    }
    async deleteMemberFromClub(memberId, clubId) {
        return await this.memberClubService.deleteMemberFromClub(memberId, clubId);
    }
};
exports.ClubMemberController = ClubMemberController;
__decorate([
    (0, common_1.Post)(':clubId/members/:memberId'),
    __param(0, (0, common_1.Param)('memberId')),
    __param(1, (0, common_1.Param)('clubId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ClubMemberController.prototype, "addMemberToClub", null);
__decorate([
    (0, common_1.Get)(':clubId/members'),
    __param(0, (0, common_1.Param)('clubId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ClubMemberController.prototype, "findMembersFromClub", null);
__decorate([
    (0, common_1.Get)(':clubId/members/:memberId'),
    __param(0, (0, common_1.Param)('memberId')),
    __param(1, (0, common_1.Param)('clubId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ClubMemberController.prototype, "findMemberFromClub", null);
__decorate([
    (0, common_1.Put)(':clubId/members'),
    __param(0, (0, common_1.Param)('clubId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array]),
    __metadata("design:returntype", Promise)
], ClubMemberController.prototype, "updateMembersFromClub", null);
__decorate([
    (0, common_1.Delete)(':clubId/members/:memberId'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('memberId')),
    __param(1, (0, common_1.Param)('clubId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ClubMemberController.prototype, "deleteMemberFromClub", null);
exports.ClubMemberController = ClubMemberController = __decorate([
    (0, common_1.Controller)('clubs'),
    __metadata("design:paramtypes", [club_member_service_1.ClubMemberService])
], ClubMemberController);
//# sourceMappingURL=club-member.controller.js.map