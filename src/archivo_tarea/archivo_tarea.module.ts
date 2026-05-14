import { Module } from '@nestjs/common';
import { ArchivoTareaService } from './archivo_tarea.service';
import { ArchivoTareaController } from './archivo_tarea.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArchivoTarea } from './entities/archivo_tarea.entity';
import { Tarea } from 'src/tarea/entities/tarea.entity';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([ArchivoTarea, Tarea]),FilesModule],
  controllers: [ArchivoTareaController],
  providers: [ArchivoTareaService],
})
export class ArchivoTareaModule {}
