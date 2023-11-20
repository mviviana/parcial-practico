"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembertModule = void 0;
const common_1 = require("@nestjs/common");
const member_service_1 = require("./member.service");
const typeorm_1 = require("@nestjs/typeorm");
const member_entity_1 = require("./member.entity");
const member_controller_1 = require("./member.controller");
let MembertModule = class MembertModule {
};
exports.MembertModule = MembertModule;
exports.MembertModule = MembertModule = __decorate([
    (0, common_1.Module)({
        providers: [member_service_1.MemberService],
        imports: [typeorm_1.TypeOrmModule.forFeature([member_entity_1.MemberEntity])],
        controllers: [member_controller_1.MemberController],
    })
], MembertModule);
//# sourceMappingURL=member.module.js.map