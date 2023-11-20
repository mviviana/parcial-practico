import { HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessException } from '../exceptions/business.exception';
import {ClubEntity} from "./club.entity";

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(ClubEntity)
    private readonly clubRepository: Repository<ClubEntity>,
  ) {}

  async findAll(): Promise<ClubEntity[]> {
    return await this.clubRepository.find({ relations: ['members'] });
  }

  async findOne(id: number): Promise<ClubEntity> {
    const club: ClubEntity = await this.clubRepository.findOne({
      where: { id },
      relations: ['members'],
    });
    if (!club)
      throw new BusinessException(
        `El club con id ${id} no existe`,
        HttpStatus.NOT_FOUND,
      );
    return club;
  }

  async create(club: ClubEntity): Promise<ClubEntity> {
    if (club.description.length > 100) {
      throw new BusinessException(
          `La descripción no debe superar los 100 caracteres`,
          HttpStatus.PRECONDITION_FAILED,
      );
    }
    return await this.clubRepository.save(club);
  }

  async update(id: number, club: ClubEntity): Promise<ClubEntity> {
    const persistedClub = await this.clubRepository.findOne({
        where: { id },
        relations: ['members'],
    });
    if (!persistedClub) {
      throw new BusinessException(
        `El club con id ${id} no existe`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (club.description.length > 100) {
      throw new BusinessException(
          `La descripción no debe superar los 100 caracteres`,
          HttpStatus.PRECONDITION_FAILED,
      );
    }

    return await this.clubRepository.save({
      ...persistedClub,
      ...club,
    });
  }

  async delete(id: number): Promise<void> {
    const persistedClub = await this.clubRepository.findOne({
      where: { id },
    });
    if (!persistedClub) {
      throw new BusinessException(
        `El club con id ${id} no existe`,
        HttpStatus.NOT_FOUND,
      );
    }
    await this.clubRepository.delete(id);
  }
}