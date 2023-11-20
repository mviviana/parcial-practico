"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClubMemberModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const club_member_service_1 = require("./club-member.service");
const member_entity_1 = require("../member/member.entity");
const club_entity_1 = require("../club/club.entity");
const club_member_controller_1 = require("./club-member.controller");
let ClubMemberModule = class ClubMemberModule {
};
exports.ClubMemberModule = ClubMemberModule;
exports.ClubMemberModule = ClubMemberModule = __decorate([
    (0, common_1.Module)({
        providers: [club_member_service_1.ClubMemberService],
        imports: [typeorm_1.TypeOrmModule.forFeature([member_entity_1.MemberEntity, club_entity_1.ClubEntity])],
        controllers: [club_member_controller_1.ClubMemberController],
    })
], ClubMemberModule);
//# sourceMappingURL=club-member.module.js.map