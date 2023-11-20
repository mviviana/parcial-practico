import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { MemberEntity } from "../member/member.entity";
import { ClubEntity } from "../club/club.entity";
import { ClubMemberService } from "./club-member.service";

describe('ClubMemberService', () => {

    let service: ClubMemberService;
    let repositoryClub: Repository<ClubEntity>;
    let repositoryMember: Repository<MemberEntity>;
    let member: MemberEntity;
    let memberList: MemberEntity[];
    let club: ClubEntity;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [...TypeOrmTestingConfig()],
            providers: [ClubMemberService],
        }).compile();

        service = module.get<ClubMemberService>(ClubMemberService);
        repositoryClub = module.get<Repository<ClubEntity>>(
            getRepositoryToken(ClubEntity),
        );
        repositoryMember = module.get<Repository<MemberEntity>>(
            getRepositoryToken(MemberEntity),
        );
        await seedData();
    });

    const seedData = async () => {
        await repositoryClub.clear();
        await repositoryMember.clear();

        memberList = [];
        for (let i = 0; i < 5; i++) {
            const member = await repositoryMember.save({
                name: faker.lorem.word(),
                email: faker.internet.email(),
                birthDate: faker.date.weekday(),
            });
            memberList.push(member);
        }

        member = await repositoryMember.save({
            name: faker.lorem.word(),
            email: faker.internet.email(),
            birthDate: faker.date.weekday(),
            id: 6
        });

        club = await repositoryClub.save({
            name: faker.lorem.word(),
            foundationDate: faker.date.weekday(),
            image: faker.internet.url(),
            description: faker.lorem.word(20),
            members: memberList,
        });
    };

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('addMemberToClub should add a member to a club', async () => {
        const result: ClubEntity = await service.addMemberToClub(memberList[0].id, club.id);
        expect(result).not.toBeNull();
        expect(result.members).toHaveLength(6);
    });

    it('addMemberToClub should throw an exception for an invalid club', async () => {
        await expect(() => service.addMemberToClub(memberList[0].id, 0)).rejects.toHaveProperty(
            'message',
            'El club con id 0 no existe',
        );
    });

    it('addMemberToClub should throw an exception for an invalid member', async () => {
        await expect(() => service.addMemberToClub(0, club.id)).rejects.toHaveProperty(
            'message',
            'El socio con id 0 no existe',
        );
    });

    it('findMembersFromClub should return members by club', async () => {
        const members: MemberEntity[] = await service.findMembersFromClub(club.id);
        expect(members.length).toBe(5)
    });

    it('findMembersFromClub should throw an exception for an invalid club', async () => {
        await expect(() => service.findMembersFromClub(0)).rejects.toHaveProperty(
            'message', 'El club con id 0 no existe');
    });

    it('findMemberFromClub should return a member by club', async () => {
        const memberResult: MemberEntity = await service.findMemberFromClub(memberList[0].id, club.id);
        expect(memberResult).not.toBeNull();
        expect(memberResult.id).toEqual(memberList[0].id);
    });

    it('findMemberFromClub should throw an exception for an invalid club', async () => {
        await expect(() => service.findMemberFromClub(memberList[0].id, 0)).rejects.toHaveProperty(
            'message', 'El club con id 0 no existe');
    });

    it('findMemberFromClub should throw an exception for an invalid member', async () => {
        await expect(() => service.findMemberFromClub(0, club.id)).rejects.toHaveProperty(
            'message', 'El socio con id 0 no existe');
    });

    it('findMemberFromClub should throw an exception for an invalid member in a club', async () => {
        await expect(() => service.findMemberFromClub(member.id, club.id)).rejects.toHaveProperty(
            'message', 'El socio con id 6 no existe en el club con id 1');
    });

    it('updateMembersFromClub should associate members to a clubs', async () => {
        const member = await repositoryMember.save({
            name: faker.lorem.word(),
            email: faker.internet.email(),
            birthDate: faker.date.weekday(),
            clubs: []
        });
        const result = await service.updateMembersFromClub([member], club.id);
        expect(result).not.toBeNull();
        expect(result.members).not.toBeNull();
        expect(result.members).toHaveLength(1);
        expect(result.members[0].id).toEqual(member.id);
        expect(result.members[0].name).toEqual(member.name);
        expect(result.members[0].email).toEqual(member.email);
        expect(result.members[0].birthDate).toEqual(member.birthDate);
    });

    it('updateMembersFromClub should throw an exception when club does not exist', async () => {
        const member = await repositoryMember.save({
            name: faker.lorem.word(),
            email: faker.internet.email(),
            birthDate: faker.date.weekday(),
            clubs: []
        });
        await expect(() => service.updateMembersFromClub([member], 0)).rejects.toHaveProperty(
            'message', 'El club con id 0 no existe');
    });

    it('updateMembersFromClub should throw an exception when member does not exist', async () => {
        const member: MemberEntity = {
            name: faker.lorem.word(),
            email: faker.internet.email(),
            birthDate: faker.date.weekday(),
            clubs: [],
            id: 0
        }
        await expect(() => service.updateMembersFromClub([member], club.id)).rejects.toHaveProperty(
            'message', 'El socio con id 0 no existe');
    });

    it('deleteMemberFromClub should delete member from a club', async () => {
        const member = memberList[0];
        const result = await service.deleteMemberFromClub(member.id, club.id);

        const findClub = await repositoryClub.findOne({ where: { id: club.id }, relations: ['members'] });
        const deletedMember = findClub.members.find((memberdMember) => memberdMember.id == member.id);

        expect(deletedMember).toBeUndefined();

    });

    it('deleteMemberFromClub should throw an exception when club does not exist', async () => {
        const member = memberList[0];
        await expect(() => service.deleteMemberFromClub(member.id, 0)).rejects.toHaveProperty(
            'message', 'El club con id 0 no existe');
    });

    it('deleteMemberFromClub should throw an exception when member does not exist', async () => {
        await expect(() => service.deleteMemberFromClub(0, club.id)).rejects.toHaveProperty(
            'message', 'El socio con id 0 no existe');
    });

    it('deleteMemberFromClub should throw an exception when member does not exist in a club', async () => {
        await expect(() => service.deleteMemberFromClub(member.id, club.id)).rejects.toHaveProperty(
            'message', 'El club con id 1 no tiene asociación con el socio con id 6');
    });

});