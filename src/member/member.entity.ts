import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ClubEntity } from '../club/club.entity';

@Entity()
export class MemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  birthDate: string;

  @ManyToMany(() => ClubEntity, (club) => club.members)
  @JoinTable()
  clubs: ClubEntity[];
}
