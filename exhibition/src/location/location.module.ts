import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institution } from 'src/exhibition/entities/institution.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Institution])], 
  providers: [LocationService],
  controllers: [LocationController]
})
export class LocationModule {}
