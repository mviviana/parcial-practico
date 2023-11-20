import { MemberService } from "./member.service";
import { MemberDto } from "./member.dto";
import { MemberEntity } from "./member.entity";
export declare class MemberController {
    private readonly memberService;
    constructor(memberService: MemberService);
    findAll(): Promise<MemberEntity[]>;
    findOne(id: number): Promise<MemberEntity>;
    create(memberDto: MemberDto): Promise<MemberEntity>;
    update(id: number, memberDto: MemberDto): Promise<MemberEntity>;
    delete(id: number): Promise<void>;
}
