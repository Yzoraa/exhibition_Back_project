import { Entity, PrimaryColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Exhibition } from './exhibition.entity';

@Entity('institutions')
export class Institution {
    @PrimaryColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 500, nullable: true })
    address?: string;

    @Column({ type: 'decimal', precision: 10, scale: 7, nullable: false })
    latitude: number;

    @Column({ type: 'decimal', precision: 10, scale: 7, nullable: false })
    longitude: number;

    @Column({ type: 'varchar', length: 50, nullable: true })
    contact_point?: string;

    @Column({ type: 'varchar', length: 500, nullable: true })
    url?: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @OneToMany(() => Exhibition, (exhibition) => exhibition.institution)
    exhibitions: Exhibition[];
}
