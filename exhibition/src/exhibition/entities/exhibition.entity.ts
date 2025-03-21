// entitiy = 테이블 (테스트용)
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('exhibitions') // 테이블 이름이 exhibitions !
export class Exhibition {
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  location: string;

  @Column()
  date: string;

  @Column('text')
  description: string;
}
