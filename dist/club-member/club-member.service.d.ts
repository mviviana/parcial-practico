import { MemberEntity } from "../member/member.entity";
import { Repository } from "typeorm";
import { ClubEntity } from "../club/club.entity";
export declare class ClubMemberService {
    private readonly memberRepository;
    private readonly clubRepository;
    constructor(memberRepository: Repository<MemberEntity>, clubRepository: Repository<ClubEntity>);
    addMemberToClub(memberId: number, clubId: number): Promise<ClubEntity>;
    findMembersFromClub(clubId: number): Promise<MemberEntity[]>;
    findMemberFromClub(memberId: number, clubId: number): Promise<MemberEntity>;
    updateMembersFromClub(members: MemberEntity[], clubID: number): Promise<ClubEntity>;
    deleteMemberFromClub(memberId: number, clubId: number): Promise<void>;
}
