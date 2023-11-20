import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { plainToInstance } from "class-transformer";
import { MemberService } from "./member.service";
import { MemberDto } from "./member.dto";
import { MemberEntity } from "./member.entity";

@Controller('members')
export class MemberController {

    constructor(private readonly memberService: MemberService) {
    }

    @Get()
    async findAll() {
        return await this.memberService.findAll();
    }

    @Get(':memberId')
    async findOne(@Param('memberId') id: number) {
        return await this.memberService.findOne(id);
    }

    @Post()
    async create(@Body() memberDto: MemberDto) {
        const member: MemberEntity = plainToInstance(MemberEntity, memberDto);
        return await this.memberService.create(member);
    }

    @Put(':memberId')
    async update(@Param('memberId') id: number, @Body() memberDto: MemberDto) {
        const member: MemberEntity = plainToInstance(MemberEntity, memberDto);
        return await this.memberService.update(id, member);
    }

    @Delete(':memberId')
    @HttpCode(204)
    async delete(@Param('memberId') id: number) {
        return await this.memberService.delete(id);
    }

}