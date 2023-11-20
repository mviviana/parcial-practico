import { HttpStatus, Injectable } from '@nestjs/common';
import { MemberEntity } from './member.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessException } from '../exceptions/business.exception';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(MemberEntity)
    private readonly memberRepository: Repository<MemberEntity>,
  ) { }

  async findAll(): Promise<MemberEntity[]> {
    return await this.memberRepository.find({ relations: ['clubs'] });
  }

  async findOne(id: number): Promise<MemberEntity> {
    const member: MemberEntity = await this.memberRepository.findOne({
      where: { id },
      relations: ['clubs'],
    });
    if (!member)
      throw new BusinessException(
        `El Socio con id ${id} no existe`,
        HttpStatus.NOT_FOUND,
      );
    return member;
  }

  validateEmail(email: string) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  async create(member: MemberEntity): Promise<MemberEntity> {
    if (!this.validateEmail(member.email)) {
      throw new BusinessException(
        `El correo electronico proporcionado no es valido`,
        HttpStatus.PRECONDITION_FAILED,
      );
    }
    return await this.memberRepository.save(member);
  }

  async update(id: number, member: MemberEntity): Promise<MemberEntity> {
    const persistedMember = await this.memberRepository.findOne({
      where: { id },
      relations: ['clubs'],
    });
    if (!persistedMember) {
      throw new BusinessException(
        `El Socio con id ${id} no existe`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (!this.validateEmail(member.email)) {
      throw new BusinessException(
        `El correo electronico proporcionado no es valido`,
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    return await this.memberRepository.save({
      ...persistedMember,
      ...member,
    });
  }

  async delete(id: number) {
    const member = await this.memberRepository.findOne({
      where: { id },
    });
    if (!member) {
      throw new BusinessException(
        `El Socio con id ${id} no existe`,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.memberRepository.remove(member);
  }
}
