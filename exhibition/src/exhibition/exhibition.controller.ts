import { Controller, Get } from '@nestjs/common';
import { ExhibitionService } from './exhibition.service';

@Controller('exhibition')
export class ExhibitionController {
    constructor(private exhibitionService: ExhibitionService) {}

    @Get('fetch') // http://localhost:5000/exhibition/fetch 호출 시 실행됨!
    async fetchData(): Promise<string> {
        return await this.exhibitionService.SaveExhibitions();
    }

    // 모든 전시 조회
    // @Get()
    // async findAll(): Promise<Exhibition[]> {
    //     return this.exhibitionService.findAll();
    // }

    // 특정 전시 조회
    // @Get(':id')
    // async findOne(@Param('id') id: number): Promise<Exhibition | null> {
    //     return this.exhibitionService.findOne(id);
    // }
}
