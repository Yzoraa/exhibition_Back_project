import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExhibitionModule } from './exhibition/exhibition.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exhibition } from './exhibition/entities/exhibition.entity';
import { Institution } from './exhibition/entities/institution.entity'
import { LocationModule } from './location/location.module';

@Module({
  imports: [
    ConfigModule.forRoot({ // 환경변수 설정 (배포, 개발 구분)
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development',
    }),

    TypeOrmModule.forRoot({ // TypeORM 설정 (db 연결)
      type: 'mysql',
      host: 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Exhibition, Institution],
      charset: 'utf8mb4',
      synchronize: process.env.NODE_ENV !== 'production', // 개발 환경에서만 true
    }),
    ExhibitionModule,
    LocationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}