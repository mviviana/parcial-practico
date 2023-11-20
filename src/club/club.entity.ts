import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { MemberEntity } from "../member/member.entity";

@Entity()
export class ClubEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  foundationDate: string;

  @Column()
  image: string;

  @Column()
  description: string;

  @ManyToMany(() => MemberEntity, member => member.clubs)
  members: MemberEntity[];
}