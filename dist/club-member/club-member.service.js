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
exports.ClubMemberService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const member_entity_1 = require("../member/member.entity");
const typeorm_2 = require("typeorm");
const club_entity_1 = require("../club/club.entity");
const business_exception_1 = require("../exceptions/business.exception");
let ClubMemberService = class ClubMemberService {
    constructor(memberRepository, clubRepository) {
        this.memberRepository = memberRepository;
        this.clubRepository = clubRepository;
    }
    async addMemberToClub(memberId, clubId) {
        const member = await this.memberRepository.findOne({ where: { id: memberId }, relations: ['clubs'] });
        if (!member) {
            throw new business_exception_1.BusinessException(`El socio con id ${memberId} no existe`, common_1.HttpStatus.NOT_FOUND);
        }
        const club = await this.clubRepository.findOne({ where: { id: clubId } });
        if (!club) {
            throw new business_exception_1.BusinessException(`La tienda con id ${clubId} no existe`, common_1.HttpStatus.NOT_FOUND);
        }
        club.members.push(member);
        return await this.clubRepository.save(club);
    }
    async findMembersFromClub(clubId) {
        const club = await this.clubRepository.findOne({ where: { id: clubId }, relations: ["members"] });
        if (!club) {
            throw new business_exception_1.BusinessException(`El club con id ${clubId} no existe`, common_1.HttpStatus.NOT_FOUND);
        }
        return club.members;
    }
    async findMemberFromClub(memberId, clubId) {
        const club = await this.clubRepository.findOne({ where: { id: clubId }, relations: ["members"] });
        if (!club) {
            throw new business_exception_1.BusinessException(`El club con id ${clubId} no existe`, common_1.HttpStatus.NOT_FOUND);
        }
        const member = await this.memberRepository.findOne({ where: { id: memberId }, relations: ["clubs"] });
        if (!member) {
            throw new business_exception_1.BusinessException(`El socio con id ${memberId} no existe`, common_1.HttpStatus.NOT_FOUND);
        }
        const memberClub = club.members.find(c => c.id === member.id);
        if (!memberClub) {
            throw new business_exception_1.BusinessException(`El socio con id ${memberId} no existe en el club con id ${clubId}`, common_1.HttpStatus.NOT_FOUND);
        }
        return memberClub;
    }
    async updateMembersFromClub(members, clubID) {
        const club = await this.clubRepository.findOne({ where: { id: clubID }, relations: ["member"] });
        if (!club) {
            throw new business_exception_1.BusinessException(`El club con id ${clubID} no existe`, common_1.HttpStatus.NOT_FOUND);
        }
        for (let i = 0; i < members.length; i++) {
            const member = await this.memberRepository.findOne({ where: { id: members[i].id } });
            if (!member) {
                throw new business_exception_1.BusinessException(`El socio con id ${clubID[i].id} no existe`, common_1.HttpStatus.NOT_FOUND);
            }
            members[i] = member;
        }
        club.members = members;
        return await this.clubRepository.save(club);
    }
    async deleteMemberFromClub(memberId, clubId) {
        const club = await this.clubRepository.findOne({ where: { id: clubId }, relations: ["members"] });
        if (!club) {
            throw new business_exception_1.BusinessException(`El club con id ${clubId} no existe`, common_1.HttpStatus.NOT_FOUND);
        }
        const member = await this.memberRepository.findOne({ where: { id: memberId }, relations: ["clubs"] });
        if (!member) {
            throw new business_exception_1.BusinessException(`El socio con id ${memberId} no existe`, common_1.HttpStatus.NOT_FOUND);
        }
        const memberClub = club.members.find(c => c.id == memberId);
        if (!memberClub) {
            throw new business_exception_1.BusinessException(`El club con id ${clubId} no tiene asociación con el socio con id ${memberId}`, common_1.HttpStatus.PRECONDITION_FAILED);
        }
        club.members = club.members.filter(c => c.id != memberId);
        await this.clubRepository.save(club);
    }
};
exports.ClubMemberService = ClubMemberService;
exports.ClubMemberService = ClubMemberService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(member_entity_1.MemberEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(club_entity_1.ClubEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ClubMemberService);
//# sourceMappingURL=club-member.service.js.map