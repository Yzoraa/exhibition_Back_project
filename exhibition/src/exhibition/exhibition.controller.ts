import { Controller, Post, Get, Body } from '@nestjs/common';
import { ExhibitionService } from './exhibition.service';
import { Exhibition } from './entities/exhibition.entity';

@Controller('exhibition')
export class ExhibitionController {
    constructor(private readonly exhibitionService: ExhibitionService) {}

    // 예시용
    @Post()
    async createData(@Body() data: Partial<Exhibition>) {
        return this.exhibitionService.createEx(data);
    }

    @Get()
    async getAll() {
        return this.exhibitionService.findAll();
    }
}
