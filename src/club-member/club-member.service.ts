import {HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {MemberEntity} from "../member/member.entity";
import {Repository} from "typeorm";
import {ClubEntity} from "../club/club.entity";
import {BusinessException} from "../exceptions/business.exception";

@Injectable()
export class ClubMemberService {

    constructor(
        @InjectRepository(MemberEntity)
        private readonly memberRepository: Repository<MemberEntity>,

        @InjectRepository(ClubEntity)
        private readonly clubRepository: Repository<ClubEntity>,
    ) { }

    async addMemberToClub(memberId: number, clubId: number): Promise<ClubEntity> {
        const member = await this.memberRepository.findOne({where: {id: memberId}, relations: ['clubs']});
        if (!member) {
            throw new BusinessException(
                `El socio con id ${memberId} no existe`,
                HttpStatus.NOT_FOUND,
            );
        }

        const club = await this.clubRepository.findOne({where: {id: clubId}, relations: ['members']});
        if (!club) {
            throw new BusinessException(
                `El club con id ${clubId} no existe`,
                HttpStatus.NOT_FOUND,
            );
        }

        club.members.push(member);
        return await this.clubRepository.save(club);
    }

    async findMembersFromClub(clubId: number): Promise<MemberEntity[]>   {
        const club: ClubEntity = await this.clubRepository.findOne({where: {id: clubId}, relations: ["members"]});
        if (!club) {
            throw new BusinessException(
                `El club con id ${clubId} no existe`,
                HttpStatus.NOT_FOUND,
            );
        }

        return club.members;
    }

    async findMemberFromClub(memberId: number, clubId: number): Promise<MemberEntity> {
        const club: ClubEntity = await this.clubRepository.findOne({where: {id: clubId}, relations: ["members"]});
        if (!club) {
            throw new BusinessException(
                `El club con id ${clubId} no existe`,
                HttpStatus.NOT_FOUND,
            );
        }

        const member: MemberEntity = await this.memberRepository.findOne({where: {id: memberId}, relations: ["clubs"]});
        if (!member) {
            throw new BusinessException(
                `El socio con id ${memberId} no existe`,
                HttpStatus.NOT_FOUND,
            );
        }

        const memberClub: MemberEntity = club.members.find(c => c.id === member.id);

        if (!memberClub) {
            throw new BusinessException(
                `El socio con id ${memberId} no existe en el club con id ${clubId}`,
                HttpStatus.NOT_FOUND,
            );

        }

        return memberClub;
    }

    async updateMembersFromClub(members: MemberEntity[], clubID: number): Promise<ClubEntity> {
        const club: ClubEntity = await this.clubRepository.findOne({where: {id: clubID}, relations: ["members"]});
        if (!club) {
            throw new BusinessException(
                `El club con id ${clubID} no existe`,
                HttpStatus.NOT_FOUND,
            );
        }

        for (let i = 0; i < members.length; i++) {
            const member: MemberEntity = await this.memberRepository.findOne({where: {id: members[i].id}});
            if (!member) {
                throw new BusinessException(
                    `El socio con id ${members[i].id} no existe`,
                    HttpStatus.NOT_FOUND,
                );
            }
            members[i] = member;
        }
        club.members = members;
        return await this.clubRepository.save(club);
    }

    async deleteMemberFromClub(memberId: number, clubId: number): Promise<void> {
        const club: ClubEntity = await this.clubRepository.findOne({where: {id: clubId}, relations: ["members"]});
        if (!club) {
            throw new BusinessException(
                `El club con id ${clubId} no existe`,
                HttpStatus.NOT_FOUND,
            );
        }

        const member: MemberEntity = await this.memberRepository.findOne({where: {id: memberId}, relations: ["clubs"]});
        if (!member) {
            throw new BusinessException(
                `El socio con id ${memberId} no existe`,
                HttpStatus.NOT_FOUND,
            );
        }

        const memberClub = club.members.find(c => c.id == memberId);
        if (!memberClub) {
            throw new BusinessException(
                `El club con id ${clubId} no tiene asociación con el socio con id ${memberId}`,
                HttpStatus.PRECONDITION_FAILED,
            );
        }

        club.members = club.members.filter(c => c.id != memberId);
        await this.clubRepository.save(club)

    }
}