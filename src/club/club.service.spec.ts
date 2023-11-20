import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { ClubService } from "./club.service";
import { ClubEntity } from "./club.entity";

describe('ClubService', () => {
    let service: ClubService;
    let repositoryClub: Repository<ClubEntity>;
    let clubList: ClubEntity[];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [...TypeOrmTestingConfig()],
            providers: [ClubService],
        }).compile();

        service = module.get<ClubService>(ClubService);
        repositoryClub = module.get<Repository<ClubEntity>>(
            getRepositoryToken(ClubEntity),
        );
        await seedData();
    });

    const seedData = async () => {
        await repositoryClub.clear();
        clubList = [];
        for (let i = 0; i < 5; i++) {
            const club = await repositoryClub.save({
                name: faker.lorem.word(),
                foundationDate: faker.date.weekday(),
                image: faker.internet.url(),
                description: faker.lorem.word(20),
            });
            clubList.push(club);
        }
        return clubList;
    }

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('findAll should return all clubs', async () => {
        const result: ClubEntity[] = await service.findAll();
        expect(result).not.toBeNull();
        expect(result).toHaveLength(5);
    });

    it('findOne should return a club by id', async () => {
        const clubdClub = clubList[0];
        const result: ClubEntity = await service.findOne(clubdClub.id);
        expect(result).not.toBeNull();
        expect(result.id).toEqual(clubdClub.id);
    });

    it('findOne should throw an exception when the club does not exist', async () => {
        await expect(() => service.findOne(0)).rejects.toHaveProperty(
            'message',
            'El club con id 0 no existe',
        );
    });

    it('should create a club', async () => {
        const club: ClubEntity = {
            id: 0,
            name: faker.lorem.word(),
            foundationDate: faker.date.weekday(),
            image: faker.internet.url(),
            description: faker.lorem.word(20),
            members: [],
        };
        const result: ClubEntity = await service.create(club);
        expect(result).not.toBeNull();
        expect(result.id).not.toBeNull();
        expect(result.name).toEqual(club.name);
        expect(result.foundationDate).toEqual(club.foundationDate);
        expect(result.image).toEqual(club.image);
        expect(result.description).toEqual(club.description);
    });

    it('create should throw an exception when description error length', async () => {
        const club: ClubEntity = {
            id: 0,
            name: faker.lorem.word(),
            foundationDate: faker.date.weekday(),
            image: faker.internet.url(),
            description: faker.lorem.sentences(103),
            members: [],
        };
        await expect(() => service.create(club)).rejects.toHaveProperty(
            'message',
            'La descripción no debe superar los 100 caracteres',
        );
    });

    it('update should update a club', async () => {
        const clubdClub = clubList[0];
        const club: ClubEntity = {
            id: clubdClub.id,
            name: faker.lorem.word(),
            foundationDate: faker.date.weekday(),
            image: faker.internet.url(),
            description: faker.lorem.word(20),
            members: [],
        };
        const result: ClubEntity = await service.update(club.id, club);
        expect(result).not.toBeNull();
        expect(result.id).toEqual(club.id);
        expect(result.name).toEqual(club.name);
        expect(result.foundationDate).toEqual(club.foundationDate);
        expect(result.image).toEqual(club.image);
        expect(result.description).toEqual(club.description);
    });

    it('update should throw an exception when the club does not exist', async () => {
        const club: ClubEntity = {
            id: 0,
            name: faker.lorem.word(),
            foundationDate: faker.date.weekday(),
            image: faker.internet.url(),
            description: faker.lorem.word(20),
            members: [],
        };
        await expect(() => service.update(club.id, club)).rejects.toHaveProperty(
            'message',
            'El club con id 0 no existe',
        );
    });

    it('update should throw an exception when description error length', async () => {
        const clubdClub = clubList[0];
        const club: ClubEntity = {
            id: clubdClub.id,
            name: faker.lorem.word(),
            foundationDate: faker.date.weekday(),
            image: faker.internet.url(),
            description: faker.lorem.sentences(103),
            members: [],
        };
        await expect(() => service.update(club.id, club)).rejects.toHaveProperty(
            'message',
            'La descripción no debe superar los 100 caracteres',
        );
    });

    it('delete should delete a club', async () => {
        const club = clubList[0];
        await service.delete(club.id);
        const deletedClub = await repositoryClub.findOne({
            where: { id: club.id },
        });
        expect(deletedClub).toBeNull();
    });

    it('delete should delete a club', async () => {
        await expect(() => service.findOne(0)).rejects.toHaveProperty(
            'message',
            'El club con id 0 no existe',
        );
    });

});
