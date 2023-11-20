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
exports.MemberService = void 0;
const common_1 = require("@nestjs/common");
const member_entity_1 = require("./member.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const business_exception_1 = require("../exceptions/business.exception");
let MemberService = class MemberService {
    constructor(memberRepository) {
        this.memberRepository = memberRepository;
    }
    async findAll() {
        return await this.memberRepository.find({ relations: ['clubs'] });
    }
    async findOne(id) {
        const member = await this.memberRepository.findOne({
            where: { id },
            relations: ['clubs'],
        });
        if (!member)
            throw new business_exception_1.BusinessException(`El Socio con id ${id} no existe`, common_1.HttpStatus.NOT_FOUND);
        return member;
    }
    validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    async create(member) {
        if (!this.validateEmail(member.email)) {
            throw new business_exception_1.BusinessException(`El correo electronico proporcionado no es valido`, common_1.HttpStatus.PRECONDITION_FAILED);
        }
        return await this.memberRepository.save(member);
    }
    async update(id, member) {
        const persistedMember = await this.memberRepository.findOne({
            where: { id },
            relations: ['clubs'],
        });
        if (!persistedMember) {
            throw new business_exception_1.BusinessException(`El Socio con id ${id} no existe`, common_1.HttpStatus.NOT_FOUND);
        }
        if (!this.validateEmail(member.email)) {
            throw new business_exception_1.BusinessException(`El correo electronico proporcionado no es valido`, common_1.HttpStatus.PRECONDITION_FAILED);
        }
        return await this.memberRepository.save({
            ...persistedMember,
            ...member,
        });
    }
    async delete(id) {
        const member = await this.memberRepository.findOne({
            where: { id },
        });
        if (!member) {
            throw new business_exception_1.BusinessException(`El Socio con id ${id} no existe`, common_1.HttpStatus.NOT_FOUND);
        }
        await this.memberRepository.remove(member);
    }
};
exports.MemberService = MemberService;
exports.MemberService = MemberService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(member_entity_1.MemberEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], MemberService);
//# sourceMappingURL=member.service.js.map