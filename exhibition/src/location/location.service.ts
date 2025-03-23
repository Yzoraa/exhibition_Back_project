import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Institution } from 'src/exhibition/entities/institution.entity';
import axios from 'axios';

@Injectable()
export class LocationService {
    private readonly KAKAO_API_URL = 'https://dapi.kakao.com/v2/local/search/keyword.json';

  constructor(
    @InjectRepository(Institution)
    private institutionRepository: Repository<Institution>,
  ) {}

  // 카카오 지도 API에서 기관명을 주소로 변환해 가져오기
  async getAddress(name: string): Promise<string | null> {
    try {
        const kakaoApiKey = process.env.KAKAO_REST_API;
        const response = await axios.get(this.KAKAO_API_URL, {
            params: {
                query: name, // 기관명
            },
            headers: {
                Authorization: `KakaoAK ${kakaoApiKey}`,
            },
        });

        const documents = response.data.documents; // 기관 검색 결과

        if (!documents || documents.length === 0) {
            return null; // 주소를 찾을 수 없는 경우
        }

        // 첫 번째 검색 결과의 주소 반환 (포스트맨 데이터 확인 -> 지번주소+도로명주소 존재)
        return documents[0].address_name || documents[0].road_address_name;

        } catch (error) {
            console.error('Kakao API 호출 오류:', error);
            return null;
        }
    } // address 잘 가져옴! (포스트맨 확인 결과 > "address": "서울 서초구 서초동 700" )

    // 가져온 값 저장
    async updateInstitution(name: string): Promise<void> {
        console.log(`기관명: ${name}`);

        const address = await this.getAddress(name);
        console.log('찾은 주소:', address);

        if (!address) {
            console.log('주소를 찾을 수 없습니다.');
            return;
        }

        const institution = await this.institutionRepository.findOne({ where:{name}});
        console.log('찾은 기관:', institution);

        if (institution) {
            // 이미 주소가 있다면 업데이트
            institution.address = address;
            await this.institutionRepository.save(institution);
        } else {
            console.log('기관을 찾을 수 없습니다.');
        }
    }
}
