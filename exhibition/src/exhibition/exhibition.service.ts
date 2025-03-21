import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Exhibition } from './entities/exhibition.entity';
import { Institution } from './entities/institution.entity';
import axios from 'axios';

@Injectable()
export class ExhibitionService {
    constructor(
        @InjectRepository(Exhibition)
        private readonly exhibitionRepository: Repository<Exhibition>,

        @InjectRepository(Institution)
        private readonly institutionRepository: Repository<Institution>,
    ) {}

    // 공공 API에서 데이터 가져와서 저장
    async SaveExhibitions(): Promise<string> {
        const baseUrl = process.env.API_BASE_URL;

        try {
            const response = await axios.get(`${baseUrl}`, {
                params: {
                    // serviceKey: apiKey,
                    // numOfRows: 10, // 10개씩 가져오기
                    // pageNo: 1,
                    type: 'json',
                },
            });
            // console.log('전체 응답 데이터:', response.data);
            // -> body{ items: [object] } 형식임을 확인!

            // 올바른 경로
            const items = response.data.response.body.items;
            const exhibitions = Array.isArray(items) ? items : items?.item;

            if (!Array.isArray(exhibitions)) {
                console.error('전시 데이터가 배열이 아닙니다:', exhibitions);
                return '전시 데이터 형식 오류 발생';
            }
            // console.log(exhibitions[0]);
            
            for (const ex of exhibitions) {
                let institution = await this.institutionRepository.findOne({ where: { name: ex.CNTC_INSTT_NM } });

                if (!institution) {
                    // institution 테이블에 저장할 정보 (api 필드명 주의)
                    institution = this.institutionRepository.create({
                        name: ex.CNTC_INSTT_NM || '',  // 기관명
                        address: ex.ADDRESS || '',
                        latitude: ex.LATITUDE ? parseFloat(ex.LATITUDE) : 0, // 숫자 변환
                        longitude: ex.LONGITUDE ? parseFloat(ex.LONGITUDE) : 0, // 숫자 변환
                        contact_point: ex.CONTACT_POINT || '',
                        url: ex.URL || '',
                    });
                    await this.institutionRepository.save(institution);
                }

                // exhibition에 저장할 정보 (api 필드명 주의)
                const newExhibition = this.exhibitionRepository.create({
                    title: ex.TITLE, // 제목 
                    description: ex.DESCRIPTION || '', // 설명
                    image_url: ex.IMAGE_OBJECT || '', // 메인 이미지 url
                    genre: ex.GENRE || '', // 장르
                    institution: institution, // 기관 FK 관계 설정
                    period: ex.PERIOD || '', // 기간 
                    event_period: ex.EVENT_PERIOD || '', // 운영시간
                    contact_point: ex.CONTACT_POINT || '', // 문의 연락처
                    url: ex.URL || '', // 전시 홈페이지 url
                });
                await this.exhibitionRepository.save(newExhibition);
                console.log('전시 데이터 저장 완료!');
            }
    
            return '전시 데이터 저장 완료!';
            
        } catch (error) {
            console.error('전시 데이터 가져오기 실패:', error);
            return '전시 데이터를 가져오는 중 오류 발생';
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