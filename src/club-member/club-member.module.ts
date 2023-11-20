import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubMemberService } from "./club-member.service";
import { MemberEntity } from "../member/member.entity";
import { ClubEntity } from "../club/club.entity";
import { ClubMemberController } from "./club-member.controller";

@Module({
    providers: [ClubMemberService],
    imports: [TypeOrmModule.forFeature([MemberEntity, ClubEntity])],
    controllers: [ClubMemberController],
})
export class ClubMemberModule { }