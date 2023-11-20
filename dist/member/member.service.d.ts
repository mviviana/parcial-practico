import { MemberEntity } from './member.entity';
import { Repository } from 'typeorm';
export declare class MemberService {
    private readonly memberRepository;
    constructor(memberRepository: Repository<MemberEntity>);
    findAll(): Promise<MemberEntity[]>;
    findOne(id: number): Promise<MemberEntity>;
    validateEmail(email: string): boolean;
    create(member: MemberEntity): Promise<MemberEntity>;
    update(id: number, member: MemberEntity): Promise<MemberEntity>;
    delete(id: number): Promise<void>;
}
