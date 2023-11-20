import { Test, TestingModule } from '@nestjs/testing';
import { MemberService } from './member.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { MemberEntity } from './member.entity';

describe('MemberService', () => {
  let service: MemberService;
  let repositoryMember: Repository<MemberEntity>;
  let memberList: MemberEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [MemberService],
    }).compile();

    service = module.get<MemberService>(MemberService);
    repositoryMember = module.get<Repository<MemberEntity>>(
      getRepositoryToken(MemberEntity),
    );
    await seedData();
  });

  const seedData = async () => {
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
    return memberList;
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all members', async () => {
    const result: MemberEntity[] = await service.findAll();
    expect(result).not.toBeNull();
    expect(result).toHaveLength(5);
  });

  it('findOne should return a member by id', async () => {
    const storedMember = memberList[0];
    const result: MemberEntity = await service.findOne(storedMember.id);
    expect(result).not.toBeNull();
    expect(result.id).toEqual(storedMember.id);
  });

  it('findOne should throw an exception when the member does not exist', async () => {
    await expect(() => service.findOne(0)).rejects.toHaveProperty(
      'message',
      'El Socio con id 0 no existe',
    );
  });

  it('create should create a member', async () => {
    const member: MemberEntity = {
      id: 0,
      name: faker.lorem.word(),
      email: faker.internet.email(),
      birthDate: faker.date.weekday(),
      clubs: [],
    };
    const newMember = await service.create(member);
    expect(newMember).not.toBeNull();
    expect(newMember.id).toBeDefined();
    expect(newMember.name).toEqual(newMember.name);
    expect(newMember.email).toEqual(newMember.email);
    expect(newMember.birthDate).toEqual(newMember.birthDate);
  });

  it('create should create a member with email error', async () => {
    const member: MemberEntity = {
      id: 0,
      name: faker.lorem.word(),
      email: faker.helpers.arrayElement(['correoerroneo', 'fail.correo']),
      birthDate: faker.date.weekday(),
      clubs: [],
    };
    await expect(() => service.create(member)).rejects.toHaveProperty(
      'message',
      'El correo electronico proporcionado no es valido',
    );
  });

  it('update should update a member', async () => {
    const storedMembers = memberList[0];
    const member: MemberEntity = {
      id: storedMembers.id,
      name: faker.lorem.word(),
      email: faker.internet.email(),
      birthDate: faker.date.weekday(),
      clubs: [],
    };
    const updatedMembers = await service.update(storedMembers.id, member);
    expect(updatedMembers).not.toBeNull();
    expect(updatedMembers.id).toEqual(member.id);
    expect(updatedMembers.name).toEqual(member.name);
    expect(updatedMembers.email).toEqual(member.email);
    expect(updatedMembers.birthDate).toEqual(member.birthDate);
  });

  it('update should throw an exception when the member does not exist', async () => {
    const member: MemberEntity = {
      id: 0,
      name: faker.lorem.word(),
      email: faker.internet.email(),
      birthDate: faker.date.weekday(),
      clubs: [],
    };
    await expect(() => service.update(0, member)).rejects.toHaveProperty(
      'message',
      'El Socio con id 0 no existe',
    );
  });

  it('update should throw an exception when the member with email error', async () => {
    const storedMembers = memberList[0];
    const member: MemberEntity = {
      id: 0,
      name: faker.lorem.word(),
      email: faker.helpers.arrayElement(['correoerroneo', 'fail.correo']),
      birthDate: faker.date.weekday(),
      clubs: [],
    };
    await expect(() => service.update(storedMembers.id, member)).rejects.toHaveProperty(
      'message',
      'El correo electronico proporcionado no es valido',
    );
  });

  it('delete should delete a member', async () => {
    const storedMember = memberList[0];
    await service.delete(storedMember.id);
    const deletedMember = await repositoryMember.findOne({
      where: { id: storedMember.id },
    });
    expect(deletedMember).toBeNull();
  });

  it('delete should throw an exception when the member does not exist', async () => {
    await expect(() => service.delete(0)).rejects.toHaveProperty(
      'message',
      'El Socio con id 0 no existe',
    );
  });
});
