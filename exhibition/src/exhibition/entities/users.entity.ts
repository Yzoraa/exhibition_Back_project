import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn({type:'int', comment:'고유 사용자ID'})
    id: number;

    @Column('varchar',{ comment: '사용자명', length: 100, nullable: false })
    name: string;

    @Column('varchar',{ comment: '이메일', length: 100, unique: true, nullable: false })
    email: string;

    @Column('decimal',{ comment: '위도', precision: 10, scale: 7, nullable: false })
    latitude: number;

    @Column('decimal', { comment: '경도', precision: 10, scale: 7, nullable: false })
    longitude: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
}
