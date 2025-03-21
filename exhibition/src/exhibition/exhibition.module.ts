import { Module } from '@nestjs/common';
import { ExhibitionService } from './exhibition.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exhibition } from './entities/exhibition.entity';
import { ExhibitionController } from './exhibition.controller';
import { Institution } from './entities/institution.entity';

@Module({
  // 현재 모듈 범위에서 사용 중인 repository들을 명시
  // 이렇게 하면 해당 모듈 범위 내에서 @InjectRepository() 데코레이터를 사용해
  // exhibitionRepository를 ExhibitionService에 주입할 수 있게 됨
  imports: [TypeOrmModule.forFeature([Exhibition, Institution])], 
  providers: [ExhibitionService],
  controllers: [ExhibitionController],
  exports: [ExhibitionService], // 다른 모듈에서도 사용 가능
})
export class ExhibitionModule {}
