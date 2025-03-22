import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exhibition } from './exhibition.entity';

@Entity('institutions')
export class Institution {
    @PrimaryGeneratedColumn({type:'int', comment:'고유 기관ID'})
    id: number;

    @Column('varchar', { comment:'기관명' , length: 255, unique: true, nullable: false })
    name: string;

    @Column('varchar', { comment: '기관 주소', length: 500, nullable: true })
    address?: string;

    @Column('decimal', { comment: '위도', precision: 10, scale: 7, nullable: false })
    latitude: number;

    @Column('decimal', { comment: '경도', precision: 10, scale: 7, nullable: false })
    longitude: number;

    @Column('varchar', { comment: '기관 연락처', length: 50, nullable: true })
    contact_point?: string;

    @Column('varchar', { comment: '기관 홈페이지', length: 500, nullable: true })
    url?: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @OneToMany(() => Exhibition, (exhibition) => exhibition.institution)
    exhibitions: Exhibition[];
}
