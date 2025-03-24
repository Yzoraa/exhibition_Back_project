import { Controller, Get, Param } from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
    constructor(private locationService: LocationService) {}

    // 기관명을 받아 주소 반환하는 API
    @Get('address/:name')
    async getAddress(@Param('name') name: string) {
        const address = await this.locationService.getAddress(name);
        if (!address) {
          return { message: '주소를 찾을 수 없습니다.' };
        }
        return { address };
    }

    // 주소 업데이트하는 API
    @Get('update-address/:name')
    async updateInstitution(@Param('name') name: string) {
        await this.locationService.updateInstitution(name);
        return { message: `${name} 기관의 주소가 업데이트되었습니다.` };
    }

    @Get('update-all')
    async updateALL(){
        await this.locationService.updateALL();
        return { message: '모든 기관 주소 업데이트가 완료되었습니다.' };
    }
}
