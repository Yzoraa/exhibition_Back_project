import { Entity, PrimaryColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Institution } from './institution.entity';
@Entity('exhibitions') // 테이블 이름이 exhibitions
export class Exhibition {
  @PrimaryColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
    title: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'varchar', length: 500, nullable: true })
    image_url?: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    genre?: string;

    @ManyToOne(() => Institution, (institution) => institution.exhibitions, { onDelete: 'CASCADE' })
    institution: Institution;

    @Column({ type: 'date', nullable: true })
    start_date?: string;

    @Column({ type: 'date', nullable: true })
    end_date?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    event_period?: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    contact_point?: string;

    @Column({ type: 'varchar', length: 500, nullable: true })
    url?: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
