import { ClubMemberService } from "./club-member.service";
import { MemberEntity } from "../member/member.entity";
import { MemberDto } from "../member/member.dto";
import { ClubEntity } from "../club/club.entity";
export declare class ClubMemberController {
    private readonly memberClubService;
    constructor(memberClubService: ClubMemberService);
    addMemberToClub(memberId: number, clubId: number): Promise<ClubEntity>;
    findMembersFromClub(id: number): Promise<MemberEntity[]>;
    findMemberFromClub(memberId: number, clubId: number): Promise<MemberEntity>;
    updateMembersFromClub(clubId: number, membersDTO: MemberDto[]): Promise<ClubEntity>;
    deleteMemberFromClub(memberId: number, clubId: number): Promise<void>;
}
