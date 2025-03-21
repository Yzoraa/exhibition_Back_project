import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryColumn()
    id: number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
    email: string;

    @Column({ type: 'decimal', precision: 10, scale: 7, nullable: false })
    latitude: number;

    @Column({ type: 'decimal', precision: 10, scale: 7, nullable: false })
    longitude: number;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
}
