import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Exhibition } from './entities/exhibition.entity';
import axios from 'axios';

@Injectable()
export class ExhibitionService {
    constructor(
        @InjectRepository(Exhibition)
        private readonly exhibitionRepository: Repository<Exhibition>,
    ) {
        // this.apiKey = this.configService.get<string>('API_KEY');
        // this.baseUrl = this.configService.get<string>('API_BASE_URL');
    }

    // 예시 데이터 저장 로직
    async createEx(data: Partial<Exhibition>): Promise<string> {
        const newData = this.exhibitionRepository.create(data);
        await this.exhibitionRepository.save(newData);
        return '데이터 저장 완료';
    }

    // 예시 데이터 모두 조회
    async findAll(): Promise<Exhibition[]> {
        return this.exhibitionRepository.find();
    }
}