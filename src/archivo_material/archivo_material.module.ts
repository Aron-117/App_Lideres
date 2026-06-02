import { Module } from '@nestjs/common';
import { ArchivoMaterialService } from './archivo_material.service';
import { ArchivoMaterialController } from './archivo_material.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArchivoMaterial } from './entities/archivo_material.entity';
import { Material } from 'src/material/entities/material.entity';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([ArchivoMaterial, Material]), FilesModule],
  controllers: [ArchivoMaterialController],
  providers: [ArchivoMaterialService],
  exports: [ArchivoMaterialService],
})
export class ArchivoMaterialModule {}
