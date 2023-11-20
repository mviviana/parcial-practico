import { ClubDto } from "./club.dto";
import { ClubEntity } from "./club.entity";
import { ClubService } from "./club.service";
export declare class ClubController {
    private readonly clubService;
    constructor(clubService: ClubService);
    findAll(): Promise<ClubEntity[]>;
    findOne(id: number): Promise<ClubEntity>;
    create(clubDto: ClubDto): Promise<ClubEntity>;
    update(id: number, clubDto: ClubDto): Promise<ClubEntity>;
    delete(id: number): Promise<void>;
}
