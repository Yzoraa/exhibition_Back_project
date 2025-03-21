import { Controller, Get } from '@nestjs/common';
import { ExhibitionService } from './exhibition.service';

@Controller('exhibition')
export class ExhibitionController {
    constructor(private readonly exhibitionService: ExhibitionService) {}

    @Get('fetch')
    async fetchData(): Promise<string> {
        return await this.exhibitionService.fetchAndSaveExhibitions();
    }
    // @Get('/fetch')
    // async fetchAndSave(): Promise<string> {
    //     return this.exhibitionService.fetchAndSaveExhibitions();
    // }

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
