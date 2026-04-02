import { Module } from '@nestjs/common';
import { MaterialService } from './material.service';
import { MaterialController } from './material.controller';
import { Material } from './entities/material.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Curso } from 'src/curso/entities/curso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Material, Curso])],
  controllers: [MaterialController],
  providers: [MaterialService],
})
export class MaterialModule {}
