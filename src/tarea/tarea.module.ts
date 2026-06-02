import { Module } from '@nestjs/common';
import { TareaService } from './tarea.service';
import { TareaController } from './tarea.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarea } from './entities/tarea.entity';
import { Curso } from 'src/curso/entities/curso.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { ArchivoTareaModule } from 'src/archivo_tarea/archivo_tarea.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tarea, Usuario, Curso]),
    ArchivoTareaModule,
  ],
  controllers: [TareaController],
  providers: [TareaService],
})
export class TareaModule {}
