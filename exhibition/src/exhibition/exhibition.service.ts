import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Exhibition } from './entities/exhibition.entity';
import { Institution } from './entities/institution.entity';
import axios from 'axios';

@Injectable()
export class ExhibitionService {
    private readonly apiKey: string;
    private readonly baseUrl: string;

    constructor(
        @InjectRepository(Exhibition)
        private readonly exhibitionRepository: Repository<Exhibition>,

        @InjectRepository(Institution)
        private readonly institutionRepository: Repository<Institution>,

        private readonly configService: ConfigService,
    ) {
        this.apiKey = this.configService.get<string>('API_KEY') ?? '';
        this.baseUrl = this.configService.get<string>('API_BASE_URL') ?? '';

        this.fetchAndSaveExhibitions(); // 서버 시작 시 자동 실행
    }

    // 공공 API에서 데이터 가져와서 저장
    async fetchAndSaveExhibitions(): Promise<string> {
        try {
            const response = await axios.get(`${this.baseUrl}`, {
                params: {
                    serviceKey: this.apiKey, // API 키 추가
                    numOfRows: 10, // 예제: 10개씩 가져오기
                    pageNo: 1,
                    type: 'json',
                },
            });

            const exhibitions = response.data.response.body.items;
            
            for (const ex of exhibitions) {
                let institution = await this.institutionRepository.findOne({ where: { name: ex.institution } });
    
                if (!institution) {
                    institution = this.institutionRepository.create({
                        name: ex.institution,
                        address: ex.address,
                        latitude: ex.latitude,
                        longitude: ex.longitude,
                        contact_point: ex.contact,
                        url: ex.homepage,
                    });
                    await this.institutionRepository.save(institution);
                }
    
                const newExhibition = this.exhibitionRepository.create({
                    title: ex.title,
                    description: ex.description,
                    image_url: ex.image,
                    genre: ex.genre,
                    institution: institution,
                    start_date: ex.startDate,
                    end_date: ex.endDate,
                    event_period: ex.period,
                    contact_point: ex.contact,
                    url: ex.detailUrl,
                });
    
                await this.exhibitionRepository.save(newExhibition);
            }
    
            console.log('✅ 전시 데이터 저장 완료!');
            return '✅ 전시 데이터 저장 완료!';
            
        } catch (error) {
            console.error('전시 데이터 가져오기 실패:', error);
            throw new Error('전시 데이터를 불러오는 중 오류 발생');
        }
    }

    // 모든 전시 조회
    // async findAll(): Promise<Exhibition[]> {
    //     return this.exhibitionRepository.find({ relations: ['institution'] }); // 기관 정보 포함
    // }

    // 특정 전시 조회
    // async findOne(id: number): Promise<Exhibition | null> {
    //     return this.exhibitionRepository.findOne({ where: { id }, relations: ['institution'] });
    // }
}