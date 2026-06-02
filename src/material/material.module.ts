import { Module } from '@nestjs/common';
import { MaterialService } from './material.service';
import { MaterialController } from './material.controller';
import { Material } from './entities/material.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Curso } from 'src/curso/entities/curso.entity';
import { ArchivoMaterialModule } from 'src/archivo_material/archivo_material.module';

@Module({
  imports: [TypeOrmModule.forFeature([Material, Curso]), ArchivoMaterialModule],
  controllers: [MaterialController],
  providers: [MaterialService],
})
export class MaterialModule {}
