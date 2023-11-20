import { MemberEntity } from "../member/member.entity";
export declare class ClubEntity {
    id: number;
    name: string;
    foundationDate: string;
    image: string;
    description: string;
    members: MemberEntity[];
}
