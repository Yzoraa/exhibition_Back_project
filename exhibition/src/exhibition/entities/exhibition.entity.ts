import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Institution } from './institution.entity';
@Entity('exhibitions') // 테이블 이름이 exhibitions
export class Exhibition {
  @PrimaryGeneratedColumn({type:'int', comment:'고유 전시ID'})
  id: number;

  @Column('varchar', {comment:'전시 제목', length: 255, nullable: false })
  title: string;

  @Column('text', {comment:'전시 설명', nullable: true })
  description?: string; // ?는 선택적 속성 의미

  @Column('varchar', {comment:'전시 메인 이미지 URL', length: 500, nullable: true })
  image_url?: string;

  @Column('varchar', {comment:'전시 장르', length: 100, nullable: true })
  genre?: string;

  @ManyToOne(() => Institution, (institution) => institution.exhibitions, { onDelete: 'CASCADE' })
  institution: Institution; // 기관ID (FK)

  // @Column('varchar', {comment:'기관위치', length: 255, nullable: true})
  // location?:string;

  @Column('varchar', {comment:'전시기간', length: 255, nullable: true })
  period?: string;

  @Column('date', {comment:'전시 종료일', nullable: true })
  end_date?: string;

  @Column('varchar', {comment:'운영시간', length: 255, nullable: true })
  event_period?: string;

  @Column('varchar', {comment:'전시 문의 연락처',length: 50, nullable: true })
  contact_point?: string;

  @Column('varchar', {comment:'전시 기관 URL', length: 500, nullable: true })
  url?: string;

  @CreateDateColumn({ type: 'timestamp' }) // 데이터 생성시간
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' }) // 데이터 수정시간
  updated_at: Date;
}
