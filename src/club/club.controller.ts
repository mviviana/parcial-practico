import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards} from '@nestjs/common';
import {ClubDto} from "./club.dto";
import {ClubEntity} from "./club.entity";
import {ClubService} from "./club.service";
import {plainToInstance} from "class-transformer";

@Controller('clubs')
export class ClubController {

    constructor(private readonly clubService: ClubService) { }

    @Get()
    async findAll() {
        return await this.clubService.findAll();
    }

    @Get(':clubId')
    async findOne(@Param('clubId') id: number) {
        return await this.clubService.findOne(id);
    }

    @Post()
    async create(@Body() clubDto: ClubDto) {
        const club: ClubEntity = plainToInstance(ClubEntity, clubDto);
        return await this.clubService.create(club);
    }

    @Put(':clubId')
    async update(@Param('clubId') id: number, @Body() clubDto: ClubDto) {
        const club: ClubEntity = plainToInstance(ClubEntity, clubDto);
        return await this.clubService.update(id, club);
    }

    @Delete(':clubId')
    @HttpCode(204)
    async delete(@Param('clubId') id: number) {
        return await this.clubService.delete(id);
    }
}