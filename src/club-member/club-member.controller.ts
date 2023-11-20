import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ClubMemberService } from "./club-member.service";
import { ClubDto } from "../club/club.dto";
import { MemberEntity } from "../member/member.entity";
import { MemberDto } from "../member/member.dto";
import { ClubEntity } from "../club/club.entity";
import { plainToInstance } from "class-transformer";

@Controller('clubs')
export class ClubMemberController {

    constructor(private readonly memberClubService: ClubMemberService) {
    }

    @Post(':clubId/members/:memberId')
    async addMemberToClub(@Param('memberId') memberId: number, @Param('clubId') clubId: number) {
        return await this.memberClubService.addMemberToClub(memberId, clubId);
    }

    @Get(':clubId/members')
    async findMembersFromClub(@Param('clubId') id: number) {
        return await this.memberClubService.findMembersFromClub(id);
    }

    @Get(':clubId/members/:memberId')
    async findMemberFromClub(@Param('memberId') memberId: number, @Param('clubId') clubId: number) {
        return await this.memberClubService.findMemberFromClub(memberId, clubId);
    }

    @Put(':clubId/members')
    async updateMembersFromClub(@Param('clubId') clubId: number, @Body() membersDTO: MemberDto[]) {
        const members: MemberEntity[] = plainToInstance(MemberEntity, membersDTO);
        return await this.memberClubService.updateMembersFromClub(members, clubId);
    }

    @Delete(':clubId/members/:memberId')
    @HttpCode(204)
    async deleteMemberFromClub(@Param('memberId') memberId: number, @Param('clubId') clubId: number) {
        return await this.memberClubService.deleteMemberFromClub(memberId, clubId);
    }
}