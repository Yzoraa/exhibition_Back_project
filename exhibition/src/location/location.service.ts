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

    // 카카오 지도 API에서 기관명을 이용해 주소, 위도, 경도 가져오기
    async getAddress(name: string): Promise<{ address: string | null; latitude: string | null; longitude: string | null }> {
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
                return { address: null, latitude: null, longitude: null }; // 주소를 찾을 수 없는 경우
            }

            // 첫번째 검색 결과의 주소, 위도, 경도 추출
            const {address_name, road_address_name, x, y} = documents[0];
            return {
                address: address_name || road_address_name || null,
                latitude: x || null,
                longitude: y || null,
            };

            // 첫 번째 검색 결과의 주소 반환 (포스트맨 데이터 확인 -> 지번주소+도로명주소 존재)
            // return documents[0].address_name || documents[0].road_address_name;
            } catch (error) {
                console.error('Kakao API 호출 오류:', error);
                return { address: null, latitude: null, longitude: null };
            }
        } // address 잘 가져옴! (포스트맨 확인 결과 > "address": "서울 서초구 서초동 700" )

        // 가져온 값 저장
        async updateInstitution(name: string): Promise<void> {
            // console.log(`기관명: ${name}`);

            const { address, latitude, longitude } = await this.getAddress(name);
            // console.log('찾은 주소:', address);

            if (!address || !latitude || !longitude) {
                console.log('주소를 찾을 수 없습니다.');
                return;
            }

            const institution = await this.institutionRepository.findOne({ where:{name}});
            // console.log('찾은 기관:', institution);

            if (institution) {
                // 이미 주소가 있다면 업데이트
                institution.address = address;
                institution.latitude = latitude;
                institution.longitude = longitude;
                await this.institutionRepository.save(institution);

                console.log(`${name} 업데이트 완료 - 주소: ${address}, 위도: ${latitude}, 경도: ${longitude}`);
            } else {
                console.log('기관을 찾을 수 없습니다.');
        }
    }
    // 모든 데이터 저장 실행
    async updateALL(): Promise<void> {
        const institutions = await this.institutionRepository.find();
        console.log(`총 ${institutions.length}개의 기관을 업데이트합니다.`);

        for (const x of institutions) {
            if (!x.address || !x.latitude || !x.longitude) { // 없는 경우만 업데이트
                await this.updateInstitution(x.name);
            }
        }
        console.log('모든 기관 주소 업데이트 완료');
    }
}
