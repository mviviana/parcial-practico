import { ClubEntity } from '../club/club.entity';
export declare class MemberEntity {
    id: number;
    name: string;
    email: string;
    birthDate: string;
    clubs: ClubEntity[];
}
