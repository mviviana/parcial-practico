import { Repository } from 'typeorm';
import { ClubEntity } from "./club.entity";
export declare class ClubService {
    private readonly clubRepository;
    constructor(clubRepository: Repository<ClubEntity>);
    findAll(): Promise<ClubEntity[]>;
    findOne(id: number): Promise<ClubEntity>;
    create(club: ClubEntity): Promise<ClubEntity>;
    update(id: number, club: ClubEntity): Promise<ClubEntity>;
    delete(id: number): Promise<void>;
}
